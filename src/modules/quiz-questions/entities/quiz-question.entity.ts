import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  ESSAY = 'essay',
  TRUE_FALSE = 'true-false',
  SHORT_ANSWER = 'short-answer',
}

@Entity('quiz_questions')
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({
    name: 'question_type',
    type: 'varchar',
    length: 50,
  })
  questionType: QuestionType;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  points: number;

  @Column({ name: 'sequence_order', type: 'integer' })
  sequenceOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
