import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('testimonies')
export class Testimony {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'course_id', nullable: true })
  courseId: string;

  @ManyToOne(() => Course, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 5 })
  rating: number;

  @Column({ type: 'varchar', length: 20, default: 'approved' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
