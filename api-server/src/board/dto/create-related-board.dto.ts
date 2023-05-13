import { RelatedBoard } from './../../entity/relation-board.entity';
export class CreateRelatedBoardDto {
  private _boardId: number;
  private _relatedBoardId: number;
  private _score: number;
  constructor(boardId: number, relatedBoardId: number, score: number) {
    this._boardId = boardId;
    this._relatedBoardId = relatedBoardId;
    this._score = score;
  }

  transFormRelatedBoard(): RelatedBoard {
    const relatedBoard = new RelatedBoard();
    relatedBoard.boardId = this._boardId;
    relatedBoard.relatedBoardId = this._relatedBoardId;
    relatedBoard.score = this._score;
    return relatedBoard;
  }
}
