import { Board } from '../../entity/board.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getByIdBoard(boardId: number) {
    return this.createQueryBuilder('board')
      .select(['board.id ', 'board.title', 'board.body', 'board.createdAt'])
      .where('board.id = :boardId', { boardId })
      .getOne();
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
