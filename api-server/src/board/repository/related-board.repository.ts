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

  async getByBoarddIdRelatedBoard(boardId: number): Promise<RelatedBoard[]> {
    return this.createQueryBuilder('relatedBoard')
      .select(['relatedBoard'])
      .innerJoinAndSelect('relatedBoard.relatedBoard', 'relatedBoardDetail')
      .where('relatedBoard.boardId = :boardId', { boardId })
      .getMany();
  }
  async getByRealtedIdBoard(boardId: number): Promise<RelatedBoard[]> {
    return this.createQueryBuilder('relatedBoard')
      .select(['relatedBoard'])
      .innerJoinAndSelect('relatedBoard.board', 'originBoard')
      .where('relatedBoard.relatedBoardId = :boardId', { boardId })
      .getMany();
  }

  // getOriginedBoardList(boardId: number): Promise<[RelatedBoard[]]> {
  //   return this.createQueryBuilder('relatedBoard')
  //     .select([
  //       'relatedBoard.score',
  //       'relatedBoard.relatedBoardId',
  //       'relatedBoardDetail',
  //     ])
  //     .where('relatedBoard.relatedBoardId = :boardId', { boardId })
  //     .getMa;
  // }
}
