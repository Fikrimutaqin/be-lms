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

  /**
   * Membuat modul kursus baru.
   */
  async create(createCourseModuleDto: CreateCourseModuleDto): Promise<CourseModule> {
    const module = this.moduleRepository.create(createCourseModuleDto);
    return await this.moduleRepository.save(module);
  }

  /**
   * Mengambil semua daftar modul.
   */
  async findAll() {
    const modules = await this.moduleRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'All modules retrieved successfully',
      data: modules
    };
  }

  /**
   * Mengambil semua modul milik satu kursus tertentu.
   * Diurutkan berdasarkan urutan materi (sequenceOrder).
   */
  async findByCourse(courseId: string) {
    const modules = await this.moduleRepository.find({
      where: { courseId },
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'Modules for the course retrieved successfully',
      data: modules
    };
  }

  /**
   * Mengambil detail satu modul.
   */
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

  /**
   * Memperbarui data modul.
   */
  async update(id: string, updateCourseModuleDto: UpdateCourseModuleDto): Promise<CourseModule> {
    const module = await this.findOne(id);
    const updatedModule = this.moduleRepository.merge(module, updateCourseModuleDto);
    return await this.moduleRepository.save(updatedModule);
  }

  /**
   * Menghapus modul dari kursus.
   */
  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.moduleRepository.remove(module);
  }
}
