import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardListDto } from './dto/get-board-list.dto';
import { ResponseEntities } from '../common/res/response.entity';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getTotalBoard(@Query() getBoardListDto: GetBoardListDto) {
    try {
      const [boards, totalCount] = await this.boardService.getBoardList(
        getBoardListDto,
      );
      return ResponseEntities.OK_WITH_PAGINATION_TOTAL_COUNT(
        boards,
        Math.ceil(getBoardListDto.page / getBoardListDto.itemCount),
        totalCount,
      );
    } catch (err) {
      return ResponseEntities.SERVER_ERROR(err.message);
    }
  }

  @Get(':id')
  async getBoardList(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.boardService.getByBoardIdRelatedList(id);
      return ResponseEntities.OK_WITH(result);
    } catch (err) {
      return ResponseEntities.SERVER_ERROR(err.message);
    }
  }

  @Post()
  async createBoard(@Body() createBoard: CreateBoardDto) {
    try {
      const result = await this.boardService.createBoard(
        createBoard.toEntity(),
      );
      return ResponseEntities.OK_WITH(result);
    } catch (err) {
      return ResponseEntities.SERVER_ERROR(err.message);
    }
  }
}
