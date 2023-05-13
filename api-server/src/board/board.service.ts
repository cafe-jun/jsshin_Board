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
  ) {}

  async getBoardList(dto: GetBoardListDto): Promise<[Board[], number]> {
    return this.boardRepository.getBoardList(dto);
  }

  async getByBoardIdRelatedList(boardId: number) {
    const related = await this.boardRepository.getRelatedBoardList(boardId);
    return related;
  }

  async createBoard(board: Partial<Board>) {
    const excludeWords: string[] = await this.boardRepository.getExcludeWords();
    this.logger.log('excludeWords', JSON.stringify(excludeWords));
    // title, body에 검색 내용 제외
    const saveBoard = await this.boardRepository.createBoard(board);
    await this.boardISAMStatRepository.createBoardStatistics(board);
    // TO DO: board entity 내부에서 처리할수 있도록 확인
    const fullWords = board.fullWordArray();
    const relatedScore = await this.boardISAMStatRepository.getRelatedBoard(
      saveBoard.identifiers[0].id,
      fullWords.join(' '),
    );
    const relatedBoards = relatedScore.map((boardScore) => {
      const createRelatedBoardDto = new CreateRelatedBoardDto(
        saveBoard.identifiers[0].id,
        boardScore.id,
        boardScore.score,
      );
      return createRelatedBoardDto.transFormRelatedBoard();
    });

    await this.relatedBoardRepository.bulkInserts(relatedBoards);
    return relatedBoards;
  }
  private checkExcludeWords(words: string[], excludeWords: string[]) {
    // 영어일경우 대문자로 검색
    return words.filter((word) => !excludeWords.includes(word.toUpperCase()));
  }
}
