import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscussionPost } from './entities/discussion-post.entity';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';

@Injectable()
export class DiscussionPostsService {
  constructor(
    @InjectRepository(DiscussionPost)
    private readonly postRepository: Repository<DiscussionPost>,
  ) {}

  async create(createDiscussionPostDto: CreateDiscussionPostDto): Promise<DiscussionPost> {
    const post = this.postRepository.create(createDiscussionPostDto);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<DiscussionPost[]> {
    return await this.postRepository.find({
      relations: ['user', 'forum'],
    });
  }

  async findByForum(forumId: string): Promise<DiscussionPost[]> {
    return await this.postRepository.find({
      where: { forumId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<DiscussionPost[]> {
    return await this.postRepository.find({
      where: { userId },
      relations: ['forum'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<DiscussionPost> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'forum'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    // Increment view count
    post.viewCount += 1;
    await this.postRepository.save(post);

    return post;
  }

  async update(id: string, updateDiscussionPostDto: UpdateDiscussionPostDto): Promise<DiscussionPost> {
    const post = await this.findOne(id);
    const updatedPost = this.postRepository.merge(post, updateDiscussionPostDto);
    return await this.postRepository.save(updatedPost);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
