import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Hide password by default in queries
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ name: 'reviews_count', default: 0 })
  reviewsCount: number;

  @Column({ name: 'students_count', default: 0 })
  studentsCount: number;

  @Column({ name: 'courses_count', default: 0 })
  coursesCount: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
