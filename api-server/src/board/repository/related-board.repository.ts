import { Repository, DataSource } from 'typeorm';
import { RelatedBoard } from '../../entity/relation-board.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RelatedBoardRepository extends Repository<RelatedBoard> {
  constructor(private dataSource: DataSource) {
    super(RelatedBoard, dataSource.createEntityManager());
  }

  async bulkInserts(relatedBoards: RelatedBoard[]) {
    return await this.bulkInsert(relatedBoards);
  }

  private bulkInsert(dtos: RelatedBoard[]): Promise<any> {
    return this.createQueryBuilder().insert().values(dtos).execute();
  }
}
