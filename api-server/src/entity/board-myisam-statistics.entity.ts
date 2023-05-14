import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RelatedBoard } from './relation-board.entity';
import { Board } from './board.entity';

@Entity('Board_MYISAM_Statistics')
export class BoardMYISAMStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column('int', { name: 'originBoardId' })
  originBoardId: number;

  @CreateDateColumn()
  createdAt: Date;

  static of(
    partial: Partial<BoardMYISAMStatistics>,
  ): Partial<BoardMYISAMStatistics> {
    return Object.assign(new BoardMYISAMStatistics(), partial);
  }
}
