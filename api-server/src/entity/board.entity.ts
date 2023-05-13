import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { RelatedBoard } from './relation-board.entity';
@Entity('Board')
export class Board {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'body' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RelatedBoard, (relatedBoard) => relatedBoard.board)
  @JoinColumn([{ name: 'id', referencedColumnName: 'boardId' }])
  relatedBoard: RelatedBoard[];

  static of(partial: Partial<Board>): Partial<Board> {
    return Object.assign(new Board(), partial);
  }
  fullWordArray(): string[] {
    return `${this.title} + ' ' + ${this.body}`.split(' ');
  }
}
