import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseModule } from './entities/course-module.entity';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';

@Injectable()
export class CourseModulesService {
  constructor(
    @InjectRepository(CourseModule)
    private readonly moduleRepository: Repository<CourseModule>,
  ) {}

  async create(createCourseModuleDto: CreateCourseModuleDto): Promise<CourseModule> {
    const module = this.moduleRepository.create(createCourseModuleDto);
    return await this.moduleRepository.save(module);
  }

  async findAll(): Promise<CourseModule[]> {
    return await this.moduleRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
  }

  async findByCourse(courseId: string): Promise<CourseModule[]> {
    return await this.moduleRepository.find({
      where: { courseId },
      order: { sequenceOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CourseModule> {
    const module = await this.moduleRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!module) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }

    return module;
  }

  async update(id: string, updateCourseModuleDto: UpdateCourseModuleDto): Promise<CourseModule> {
    const module = await this.findOne(id);
    const updatedModule = this.moduleRepository.merge(module, updateCourseModuleDto);
    return await this.moduleRepository.save(updatedModule);
  }

  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.moduleRepository.remove(module);
  }
}
