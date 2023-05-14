import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Board } from './board.entity';

@Entity('RelatedBoard')
export class RelatedBoard {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('int', { name: 'boardId' })
  boardId: number;

  @Column('int', { name: 'relatedBoardId' })
  relatedBoardId: number;

  @Column('int', { name: 'score' })
  score: number;

  @ManyToOne(() => Board, (board) => board.relatedBoard)
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  board: Board[];

  @OneToOne(() => Board, (board) => board.relatedBoard)
  @JoinColumn([{ name: 'relatedBoardId', referencedColumnName: 'id' }])
  relatedBoard: Board;
}
