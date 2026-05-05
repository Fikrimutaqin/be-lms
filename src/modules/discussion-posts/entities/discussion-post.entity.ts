import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DiscussionForum } from '../../discussion-forums/entities/discussion-forum.entity';

@Entity('discussion_posts')
export class DiscussionPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'forum_id' })
  forumId: string;

  @ManyToOne(() => DiscussionForum, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'forum_id' })
  forum: DiscussionForum;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'reply_count', type: 'integer', default: 0 })
  replyCount: number;

  @Column({ name: 'view_count', type: 'integer', default: 0 })
  viewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
