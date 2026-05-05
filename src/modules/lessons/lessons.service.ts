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

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonRepository.create(createLessonDto);
    return await this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
  }

  async findByModule(moduleId: string): Promise<Lesson[]> {
    return await this.lessonRepository.find({
      where: { moduleId },
      order: { sequenceOrder: 'ASC' },
    });
  }

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

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    const updatedLesson = this.lessonRepository.merge(lesson, updateLessonDto);
    return await this.lessonRepository.save(updatedLesson);
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
