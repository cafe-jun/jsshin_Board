import { BoardMYISAMStatistics } from './board-myisam-statistics.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => RelatedBoard, (relatedBoard) => relatedBoard.relatedBoard)
  @JoinColumn([{ name: 'id', referencedColumnName: 'relatedBoardId' }])
  relatedDetailBoard: RelatedBoard;

  static of(partial: Partial<Board>): Partial<Board> {
    return Object.assign(new Board(), partial);
  }
  fullWordsArray(): string[] {
    // 게시글 제복과 본문을 합친 문자열의 중복값 제거후 결합
    const boardWords = `${this.title} ${this.body}`;
    const regex = /[,+()*^%$#@!]/g;
    // 특수문자를 띄어쓰기로 대체
    const excludepecialWords = boardWords.replace(regex, '');
    return this.validateWord(excludepecialWords.split(' '));
  }
  private validateWord(words: string[]) {
    // 중복값 제거
    return [...new Set(words)];
  }
}
