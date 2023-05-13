import { Board } from '../../entity/board.entity';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource, InsertResult } from 'typeorm';
import {
  OptimizeBoardTableQuery,
  TotalBoardFrequencyWordsQuery,
} from '../query/raw.query';
import { BoardScores } from '../type/board.type';
import { GetBoardListDto } from '../dto/get-board-list.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  getBoardList(dto: GetBoardListDto): Promise<[Board[], number]> {
    return this.findAndCount({
      select: {
        id: true,
        title: true,
        body: false,
        createdAt: true,
      },
      skip: dto.page - 1,
      take: dto.itemCount,
    });
  }

  getRelatedBoardList(boardId: number) {
    return this.createQueryBuilder('board')
      .select([
        'board',
        'relatedBoard.relatedBoardId',
        'relatedBoard.score',
        'relatedBoardDetail.title',
        'relatedBoardDetail.body',
      ])
      .innerJoin('board.relatedBoard', 'relatedBoard')
      .innerJoin('relatedBoard.board', 'relatedBoardDetail')
      .where('board.id = :boardId', { boardId })
      .orderBy('relatedBoard.score', 'DESC')
      .getMany();
  }
  // 전체게시글 중에 60%이상에서 발견되는 단어는 연관게시글을 파악할때 사용하지 않도록 전체 게시글의 임계치
  async getExcludeWords(): Promise<string[]> {
    await this.dataSource.query(OptimizeBoardTableQuery);
    const excludeWords: { WORD: string; FREQUENCY: string }[] =
      await this.dataSource.query(TotalBoardFrequencyWordsQuery(0.6));
    return excludeWords.map((excludeWord) => excludeWord.WORD.toUpperCase());
  }

  async createBoard(dto: Partial<Board>): Promise<InsertResult> {
    return this.createQueryBuilder().insert().values(dto).execute();
  }
}
