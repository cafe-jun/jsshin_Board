import { BoardMYISAMStatistics } from './../entity/board-myisam-statistics.entity';
import { BoardRepository } from './repository/board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Board } from '../entity/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { RelatedBoard } from '../entity/relation-board.entity';
import { RelatedBoardRepository } from './repository/related-board.repository';
import { BoardMYISAMStatisticsRepository } from './repository/board-myisam-stat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, RelatedBoard, BoardMYISAMStatistics]),
  ],
  controllers: [BoardController],
  providers: [
    BoardRepository,
    RelatedBoardRepository,
    BoardMYISAMStatisticsRepository,
    BoardService,
  ],
})
export class BoardModule {}
