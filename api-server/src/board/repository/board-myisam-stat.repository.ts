import { Board } from '../../entity/board.entity';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource, InsertResult } from 'typeorm';
import { FrequencyWordsMYISAMEngineQuery } from '../query/raw.query';
import { IBoardScores } from '../type/board.type';
import { BoardMYISAMStatistics } from '../../entity/board-myisam-statistics.entity';

@Injectable()
export class BoardMYISAMStatisticsRepository extends Repository<BoardMYISAMStatistics> {
  constructor(private dataSource: DataSource) {
    super(BoardMYISAMStatistics, dataSource.createEntityManager());
  }
  async createBoardStatistics(dto: Partial<Board>): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .values({
        title: dto.title,
        body: dto.body,
        originBoardId: dto.id,
      })
      .execute();
  }
  async getRelatedBoard(
    originBoardId: number,
    words: string,
  ): Promise<IBoardScores[]> {
    return this.dataSource.query(
      FrequencyWordsMYISAMEngineQuery(originBoardId, words),
    );
  }
}
