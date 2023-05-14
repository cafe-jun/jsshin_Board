import { Board } from '../../entity/board.entity';

export interface BoardScores extends Board {
  score: number;
  originBoardId: number;
}
