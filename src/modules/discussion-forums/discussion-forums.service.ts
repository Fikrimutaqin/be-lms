import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscussionForum } from './entities/discussion-forum.entity';
import { CreateDiscussionForumDto } from './dto/create-discussion-forum.dto';
import { UpdateDiscussionForumDto } from './dto/update-discussion-forum.dto';

@Injectable()
export class DiscussionForumsService {
  constructor(
    @InjectRepository(DiscussionForum)
    private readonly forumRepository: Repository<DiscussionForum>,
  ) {}

  /**
   * Membuat forum diskusi baru.
   */
  async create(createDiscussionForumDto: CreateDiscussionForumDto): Promise<DiscussionForum> {
    const forum = this.forumRepository.create(createDiscussionForumDto);
    return await this.forumRepository.save(forum);
  }

  /**
   * Mengambil semua daftar forum.
   */
  async findAll() {
    const forums = await this.forumRepository.find({
      relations: ['course'],
    });
    return {
      message: 'All discussion forums retrieved successfully',
      data: forums
    };
  }

  /**
   * Mencari forum berdasarkan kursus terkait.
   */
  async findByCourse(courseId: string) {
    const forums = await this.forumRepository.find({
      where: { courseId },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Forums for the course retrieved successfully',
      data: forums
    };
  }

  /**
   * Mengambil detail satu forum.
   */
  async findOne(id: string): Promise<DiscussionForum> {
    const forum = await this.forumRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!forum) {
      throw new NotFoundException(`Forum with ID "${id}" not found`);
    }

    return forum;
  }

  /**
   * Memperbarui data forum.
   */
  async update(id: string, updateDiscussionForumDto: UpdateDiscussionForumDto): Promise<DiscussionForum> {
    const forum = await this.findOne(id);
    const updatedForum = this.forumRepository.merge(forum, updateDiscussionForumDto);
    return await this.forumRepository.save(updatedForum);
  }

  /**
   * Menghapus forum.
   */
  async remove(id: string): Promise<void> {
    const forum = await this.findOne(id);
    await this.forumRepository.remove(forum);
  }
}
