import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DiscussionPost } from '../discussion-posts/entities/discussion-post.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(DiscussionPost)
    private readonly postRepository: Repository<DiscussionPost>,
  ) {}

  /**
   * Menambahkan komentar baru.
   * Setiap kali komentar ditambah, jumlah replyCount pada postingan asli akan otomatis bertambah.
   */
  async create(createCommentDto: CreateCommentDto, user: any): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId: user.id,
    });
    const savedComment = await this.commentRepository.save(comment);

    // Update jumlah balasan di postingan utama
    await this.postRepository.increment({ id: createCommentDto.postId }, 'replyCount', 1);

    return savedComment;
  }

  /**
   * Mengambil semua komentar.
   */
  async findAll() {
    const comments = await this.commentRepository.find({
      relations: ['user', 'post'],
    });
    return {
      message: 'All comments retrieved successfully',
      data: comments
    };
  }

  /**
   * Mengambil semua komentar pada satu postingan.
   * Diurutkan dari yang paling lama (ASC) agar alur percakapan runtut.
   */
  async findByPost(postId: string) {
    const comments = await this.commentRepository.find({
      where: { postId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
    return {
      message: 'Comments for the post retrieved successfully',
      data: comments
    };
  }

  /**
   * Mencari detail komentar.
   */
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

  /**
   * Memperbarui isi komentar.
   * Hanya penulis komentar atau Admin yang diizinkan.
   */
  async update(id: string, updateCommentDto: UpdateCommentDto, user: any): Promise<Comment> {
    const comment = await this.findOne(id);

    if (comment.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this comment');
    }

    const updatedComment = this.commentRepository.merge(comment, updateCommentDto);
    return await this.commentRepository.save(updatedComment);
  }

  /**
   * Menghapus komentar.
   * Otomatis mengurangi jumlah replyCount pada postingan asli.
   */
  async remove(id: string, user: any): Promise<void> {
    const comment = await this.findOne(id);

    if (comment.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this comment');
    }

    await this.commentRepository.remove(comment);

    // Kurangi jumlah balasan di postingan utama
    await this.postRepository.decrement({ id: comment.postId }, 'replyCount', 1);
  }
}
