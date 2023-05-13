import { Board } from './../../entity/board.entity';
import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString({ message: '게시판 제목을 입력하세요' })
  title: string;
  @IsString({ message: '게시판 본문을 입력하세요' })
  body: string;

  public toEntity(): Partial<Board> {
    return Board.of({ title: this.title, body: this.body });
  }
}
