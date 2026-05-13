import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository, FindManyOptions } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';
import { CourseStats } from './entities/course-stats.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UserRole } from '../users/entities/user.entity';
import { paginate } from '../../common/utils/pagination.util';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseStats)
    private readonly statsRepository: Repository<CourseStats>,
  ) { }

  /**
   * Membuat kursus baru.
   * instructorId diisi otomatis dari user yang sedang login untuk keamanan.
   */
  async create(createCourseDto: CreateCourseDto, user: any): Promise<Course> {
    const course = this.courseRepository.create({
      ...createCourseDto,
      instructorId: user.id,
    });
    return await this.courseRepository.save(course);
  }

  /**
   * Mengambil daftar kursus dengan metadata pagination.
   * Menggunakan findAndCount agar kita tahu total data untuk dihitung di frontend.
   */
  async findAll(query: CourseQueryDto) {
    const options: FindManyOptions<Course> = {
      relations: ['instructor', 'category'],
      order: { createdAt: 'DESC' },
    };

    if (query.categoryId) {
      options.where = { categoryId: query.categoryId };
    }

    return paginate(
      this.courseRepository,
      options,
      query,
      query.categoryId ? 'Courses for category retrieved successfully' : 'Courses retrieved successfully',
    );
  }

  /**
   * Mencari satu kursus. Jika tidak ada, langsung lempar 404.
   */
  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructor'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }

    return course;
  }

  /**
   * Mengupdate data kursus.
   * Keamanan: Hanya pemilik kursus atau Admin yang diizinkan.
   */
  async update(id: string, updateCourseDto: UpdateCourseDto, user: any): Promise<Course> {
    const course = await this.findOne(id);

    // Proteksi: Mencegah instruktur lain mengedit kursus yang bukan miliknya
    if (course.instructorId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this course');
    }

    const updatedCourse = this.courseRepository.merge(course, updateCourseDto);
    return await this.courseRepository.save(updatedCourse);
  }

  /**
   * Menghapus kursus.
   * Keamanan: Sama dengan update, harus pemilik atau Admin.
   */
  async remove(id: string, user: any): Promise<void> {
    const course = await this.findOne(id);

    if (course.instructorId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this course');
    }

    await this.courseRepository.remove(course);
  }

  /**
   * Mengambil data statistik dari Database View (CourseStats).
   */
  async getStats(): Promise<CourseStats[]> {
    return await this.statsRepository.find();
  }
}
