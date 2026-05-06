import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  /**
   * Mencatat nilai baru.
   * Harus menyertakan referensi apakah ini nilai Tugas (submissionId) atau nilai Kuis (quizAnswerId).
   */
  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    if (!createGradeDto.submissionId && !createGradeDto.quizAnswerId) {
      throw new BadRequestException('Either submissionId or quizAnswerId must be provided');
    }

    const grade = this.gradeRepository.create(createGradeDto);
    return await this.gradeRepository.save(grade);
  }

  /**
   * Mengambil semua daftar nilai.
   */
  async findAll() {
    const grades = await this.gradeRepository.find({
      relations: ['user', 'submission', 'quizAnswer'],
    });
    return {
      message: 'All grades retrieved successfully',
      data: grades
    };
  }

  /**
   * Mengambil riwayat nilai milik satu user tertentu.
   */
  async findByUser(userId: string) {
    const grades = await this.gradeRepository.find({
      where: { userId },
      relations: ['submission', 'quizAnswer', 'submission.assignment', 'quizAnswer.quizQuestion'],
      order: { gradedAt: 'DESC' },
    });
    return {
      message: 'User grades retrieved successfully',
      data: grades
    };
  }

  /**
   * Mencari detail satu nilai.
   */
  async findOne(id: string): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
      where: { id },
      relations: ['user', 'submission', 'quizAnswer'],
    });

    if (!grade) {
      throw new NotFoundException(`Grade with ID "${id}" not found`);
    }

    return grade;
  }

  /**
   * Memperbarui nilai.
   */
  async update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const grade = await this.findOne(id);
    const updatedGrade = this.gradeRepository.merge(grade, updateGradeDto);
    return await this.gradeRepository.save(updatedGrade);
  }

  /**
   * Menghapus data nilai.
   */
  async remove(id: string): Promise<void> {
    const grade = await this.findOne(id);
    await this.gradeRepository.remove(grade);
  }
}
