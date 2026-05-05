import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

export enum ResourceType {
  PDF = 'pdf',
  VIDEO = 'video',
  LINK = 'link',
  DOCUMENT = 'document',
  IMAGE = 'image',
}

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'resource_url', type: 'text' })
  resourceUrl: string;

  @Column({
    name: 'resource_type',
    type: 'varchar',
    length: 50,
  })
  resourceType: ResourceType;

  @Column({ name: 'sequence_order', type: 'integer' })
  sequenceOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
