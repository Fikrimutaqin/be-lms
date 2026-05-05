import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment, EnrollmentStatus } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { StudentProgress } from './entities/student-progress.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(StudentProgress)
    private readonly progressRepository: Repository<StudentProgress>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const { userId, courseId } = createEnrollmentDto;

    const existing = await this.enrollmentRepository.findOne({
      where: { userId, courseId },
    });

    if (existing) {
      throw new ConflictException('User is already enrolled in this course');
    }

    const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      relations: ['user', 'course'],
    });
  }

  async findByUser(userId: string): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      where: { userId },
      relations: ['course'],
    });
  }

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

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);

    // Auto-set completedAt if status changes to COMPLETED
    if (updateEnrollmentDto.status === EnrollmentStatus.COMPLETED && enrollment.status !== EnrollmentStatus.COMPLETED) {
      updateEnrollmentDto.completedAt = new Date();
    }

    const updatedEnrollment = this.enrollmentRepository.merge(enrollment, updateEnrollmentDto);
    return await this.enrollmentRepository.save(updatedEnrollment);
  }

  async remove(id: string): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepository.remove(enrollment);
  }

  async getStudentProgress(userId: string): Promise<StudentProgress[]> {
    return await this.progressRepository.find({
      where: { userId },
    });
  }

  async getCourseProgress(courseId: string): Promise<StudentProgress[]> {
    return await this.progressRepository.find({
      where: { courseId },
    });
  }
}
