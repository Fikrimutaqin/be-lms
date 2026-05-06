import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  /**
   * Membuat materi baru.
   */
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonRepository.create(createLessonDto);
    return await this.lessonRepository.save(lesson);
  }

  /**
   * Mengambil semua daftar materi.
   */
  async findAll() {
    const lessons = await this.lessonRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'All lessons retrieved successfully',
      data: lessons
    };
  }

  /**
   * Mengambil semua materi milik modul tertentu.
   */
  async findByModule(moduleId: string) {
    const lessons = await this.lessonRepository.find({
      where: { moduleId },
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'Lessons for the module retrieved successfully',
      data: lessons
    };
  }

  /**
   * Mencari detail satu materi.
   */
  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['module', 'module.course'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }

    return lesson;
  }

  /**
   * Memperbarui materi.
   */
  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    const updatedLesson = this.lessonRepository.merge(lesson, updateLessonDto);
    return await this.lessonRepository.save(updatedLesson);
  }

  /**
   * Menghapus materi.
   */
  async remove(id: string): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
