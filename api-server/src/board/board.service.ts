import { DataSource } from 'typeorm';
import { BoardMYISAMStatisticsRepository } from './repository/board-myisam-stat.repository';
import { BoardMYISAMStatistics } from './../entity/board-myisam-statistics.entity';
import { RelatedBoardRepository } from './repository/related-board.repository';
import { Board } from './../entity/board.entity';
import { Injectable, Logger } from '@nestjs/common';
import { BoardRepository } from './repository/board.repository';
import { CreateRelatedBoardDto } from './dto/create-related-board.dto';
import { GetBoardListDto } from './dto/get-board-list.dto';

@Injectable()
export class BoardService {
  private logger = new Logger(BoardService.name);
  constructor(
    private boardRepository: BoardRepository,
    private relatedBoardRepository: RelatedBoardRepository,
    private boardISAMStatRepository: BoardMYISAMStatisticsRepository,
    private dataSource: DataSource,
  ) {}

  async getBoardList(dto: GetBoardListDto): Promise<[Board[], number]> {
    return this.boardRepository.getBoardList(dto);
  }

  async getByBoardIdRelatedList(boardId: number) {
    // 게시글 상세 정보 조회
    const board = await this.boardRepository.getByIdBoard(boardId);
    // 게시글 생성시 연결된 연관 게시물 조회
    const relateBoard =
      await this.relatedBoardRepository.getByBoarddIdRelatedBoard(boardId);
    // 해당 게시글에 연관된 게시글 조회 (생성 이후에 연동되는 게시글 조회 역활)
    const relatedBoard = await this.relatedBoardRepository.getByRealtedIdBoard(
      boardId,
    );
    const result = {
      ...board,
      relate: relateBoard,
      related: relatedBoard,
    };
    return result;
  }

  async createBoard(board: Partial<Board>) {
    // 전체 게시글의 60% 이상의 빈도수의 단어 배열로 반환
    const excludeWords: string[] = await this.boardRepository.getExcludeWords();
    this.logger.log('excludeWords', JSON.stringify(excludeWords));
    // 트랜잭션 가동
    await this.dataSource.transaction(async (te) => {
      const saveBoard = await this.boardRepository.createBoard(board);
      // 통계용 테이블도 동일하게 적용
      await this.boardISAMStatRepository.createBoardStatistics(board);
      const fullWordsArray = board.fullWordsArray();
      // 전체 게시글의 60% 이상의 빈도수의 단어 제외
      this.logger.log('fullWords', JSON.stringify(fullWordsArray));
      const excludeFrequencyWords = fullWordsArray.filter(
        (word) => !excludeWords.includes(word),
      );
      this.logger.log(
        'excludeFrequencyWords',
        JSON.stringify(excludeFrequencyWords),
      );
      // Board_MYISAM_Statistics 테이블에서 조회한 score => 정확한 매칭룰 확인
      const relatedScore = await this.boardISAMStatRepository.getRelatedBoard(
        saveBoard.identifiers[0].id,
        excludeFrequencyWords.join(' '),
      );
      const relatedBoards = relatedScore.map((boardScore) => {
        const createRelatedBoardDto = new CreateRelatedBoardDto(
          saveBoard.identifiers[0].id,
          boardScore.originBoardId,
          boardScore.score,
        );
        return createRelatedBoardDto.transFormRelatedBoard();
      });
      // 연관 게시물 연결
      await this.relatedBoardRepository.bulkInserts(relatedBoards);
    });
    // title, body에 검색 내용 제외
    return 'success';
  }
}
