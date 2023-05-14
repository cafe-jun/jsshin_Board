import { Board } from '../../entity/board.entity';

export interface IBoardScores extends Board {
  score: number;
  originBoardId: number;
}

export interface IWordFrequency {
  WORD: string;
  FREQUENCY: string;
}
