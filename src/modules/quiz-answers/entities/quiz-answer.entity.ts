import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { QuizQuestion } from '../../quiz-questions/entities/quiz-question.entity';

@Entity('quiz_answers')
export class QuizAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_question_id' })
  quizQuestionId: string;

  @ManyToOne(() => QuizQuestion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_question_id' })
  quizQuestion: QuizQuestion;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'answer_text', type: 'text' })
  answerText: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  score: number;

  @CreateDateColumn({ name: 'answered_at' })
  answeredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
