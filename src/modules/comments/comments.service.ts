import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DiscussionPost } from '../discussion-posts/entities/discussion-post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(DiscussionPost)
    private readonly postRepository: Repository<DiscussionPost>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    const savedComment = await this.commentRepository.save(comment);

    // Increment reply count in post
    await this.postRepository.increment({ id: createCommentDto.postId }, 'replyCount', 1);

    return savedComment;
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['user', 'post'],
    });
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { postId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    const updatedComment = this.commentRepository.merge(comment, updateCommentDto);
    return await this.commentRepository.save(updatedComment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);

    // Decrement reply count in post
    await this.postRepository.decrement({ id: comment.postId }, 'replyCount', 1);
  }
}
