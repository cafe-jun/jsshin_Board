import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { RelatedBoard } from './relation-board.entity';

@Entity('Board_MYISAM_Statistics')
export class BoardMYISAMStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  static of(
    partial: Partial<BoardMYISAMStatistics>,
  ): Partial<BoardMYISAMStatistics> {
    return Object.assign(new BoardMYISAMStatistics(), partial);
  }
}
