import { IsNumberString } from 'class-validator';

export class GetBoardListDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  itemCount: number;
}
