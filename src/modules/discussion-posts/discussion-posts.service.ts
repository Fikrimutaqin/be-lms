import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscussionPost } from './entities/discussion-post.entity';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class DiscussionPostsService {
  constructor(
    @InjectRepository(DiscussionPost)
    private readonly postRepository: Repository<DiscussionPost>,
  ) {}

  /**
   * Membuat postingan baru.
   */
  async create(createDiscussionPostDto: CreateDiscussionPostDto, user: any): Promise<DiscussionPost> {
    const post = this.postRepository.create({
      ...createDiscussionPostDto,
      userId: user.id,
    });
    return await this.postRepository.save(post);
  }

  /**
   * Mengambil semua postingan dengan pagination.
   */
  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.postRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: ['user', 'forum'],
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Discussion posts retrieved successfully',
      data: items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: Number(limit),
        totalPages,
        currentPage: Number(page),
      },
    };
  }

  /**
   * Mengambil semua postingan dalam forum tertentu.
   */
  async findByForum(forumId: string) {
    const posts = await this.postRepository.find({
      where: { forumId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Forum posts retrieved successfully',
      data: posts
    };
  }

  /**
   * Mengambil riwayat postingan user.
   */
  async findByUser(userId: string) {
    const posts = await this.postRepository.find({
      where: { userId },
      relations: ['forum'],
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'User posts retrieved successfully',
      data: posts
    };
  }

  /**
   * Mencari detail postingan dan menambah jumlah view secara otomatis.
   */
  async findOne(id: string): Promise<DiscussionPost> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'forum'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    // Tambahkan view count setiap kali post dibuka
    post.viewCount += 1;
    await this.postRepository.save(post);

    return post;
  }

  /**
   * Memperbarui postingan.
   * Keamanan: Hanya penulis postingan atau Admin yang diizinkan.
   */
  async update(id: string, updateDiscussionPostDto: UpdateDiscussionPostDto, user: any): Promise<DiscussionPost> {
    const post = await this.findOne(id);

    if (post.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this post');
    }

    const updatedPost = this.postRepository.merge(post, updateDiscussionPostDto);
    return await this.postRepository.save(updatedPost);
  }

  /**
   * Menghapus postingan.
   */
  async remove(id: string, user: any): Promise<void> {
    const post = await this.findOne(id);

    if (post.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this post');
    }

    await this.postRepository.remove(post);
  }
}
