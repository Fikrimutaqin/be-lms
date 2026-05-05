import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Check } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { QuizAnswer } from '../../quiz-answers/entities/quiz-answer.entity';

@Entity('grades')
@Check(`"submission_id" IS NOT NULL OR "quiz_answer_id" IS NOT NULL`)
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'submission_id', nullable: true })
  submissionId: string;

  @ManyToOne(() => Submission, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @Column({ name: 'quiz_answer_id', nullable: true })
  quizAnswerId: string;

  @ManyToOne(() => QuizAnswer, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'quiz_answer_id' })
  quizAnswer: QuizAnswer;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  score: number;

  @Column({ name: 'grade_letter', length: 2, nullable: true })
  gradeLetter: string;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @CreateDateColumn({ name: 'graded_at' })
  gradedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
