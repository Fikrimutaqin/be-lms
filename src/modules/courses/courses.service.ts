import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseStats } from './entities/course-stats.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseStats)
    private readonly statsRepository: Repository<CourseStats>,
  ) {}

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
  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.courseRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: ['instructor'], // Sertakan info instruktur
      order: { createdAt: 'DESC' }, // Kursus terbaru muncul paling atas
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Courses retrieved successfully',
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
