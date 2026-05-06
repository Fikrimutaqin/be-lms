import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment, EnrollmentStatus } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { StudentProgress } from './entities/student-progress.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(StudentProgress)
    private readonly progressRepository: Repository<StudentProgress>,
  ) {}

  /**
   * Mendaftarkan user ke sebuah kursus.
   * Dilakukan pengecekan agar user tidak bisa mendaftar dua kali di kursus yang sama.
   */
  async create(createEnrollmentDto: CreateEnrollmentDto, user: any): Promise<Enrollment> {
    const userId = user.id;
    const { courseId } = createEnrollmentDto;

    const existing = await this.enrollmentRepository.findOne({
      where: { userId, courseId },
    });

    if (existing) {
      throw new ConflictException('User is already enrolled in this course');
    }

    const enrollment = this.enrollmentRepository.create({
      ...createEnrollmentDto,
      userId,
    });
    return await this.enrollmentRepository.save(enrollment);
  }

  /**
   * Mengambil semua daftar pendaftaran dengan pagination.
   */
  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.enrollmentRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: ['user', 'course'],
      order: { enrolledAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Enrollments retrieved successfully',
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
   * Mencari semua kursus yang sedang diikuti oleh user tertentu.
   */
  async findByUser(userId: string) {
    const enrollments = await this.enrollmentRepository.find({
      where: { userId },
      relations: ['course'],
    });

    return {
      message: 'User enrollments retrieved successfully',
      data: enrollments
    };
  }

  /**
   * Mengambil detail pendaftaran.
   */
  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID "${id}" not found`);
    }

    return enrollment;
  }

  /**
   * Mengupdate status pendaftaran.
   * Jika status diubah jadi COMPLETED, otomatis mengisi tanggal completedAt.
   */
  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);

    if (updateEnrollmentDto.status === EnrollmentStatus.COMPLETED && enrollment.status !== EnrollmentStatus.COMPLETED) {
      updateEnrollmentDto.completedAt = new Date();
    }

    const updatedEnrollment = this.enrollmentRepository.merge(enrollment, updateEnrollmentDto);
    return await this.enrollmentRepository.save(updatedEnrollment);
  }

  /**
   * Menghapus pendaftaran.
   */
  async remove(id: string): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepository.remove(enrollment);
  }

  /**
   * Mengambil data statistik progres belajar siswa.
   */
  async getStudentProgress(userId: string) {
    const progress = await this.progressRepository.find({
      where: { userId },
    });

    return {
      message: 'Student progress retrieved successfully',
      data: progress
    };
  }

  /**
   * Mengambil statistik progres seluruh siswa dalam satu kursus.
   */
  async getCourseProgress(courseId: string) {
    const progress = await this.progressRepository.find({
      where: { courseId },
    });

    return {
      message: 'Course progress retrieved successfully',
      data: progress
    };
  }
}
