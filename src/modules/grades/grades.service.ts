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

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    if (!createGradeDto.submissionId && !createGradeDto.quizAnswerId) {
      throw new BadRequestException('Either submissionId or quizAnswerId must be provided');
    }

    const grade = this.gradeRepository.create(createGradeDto);
    return await this.gradeRepository.save(grade);
  }

  async findAll(): Promise<Grade[]> {
    return await this.gradeRepository.find({
      relations: ['user', 'submission', 'quizAnswer'],
    });
  }

  async findByUser(userId: string): Promise<Grade[]> {
    return await this.gradeRepository.find({
      where: { userId },
      relations: ['submission', 'quizAnswer', 'submission.assignment', 'quizAnswer.quizQuestion'],
      order: { gradedAt: 'DESC' },
    });
  }

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

  async update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const grade = await this.findOne(id);
    const updatedGrade = this.gradeRepository.merge(grade, updateGradeDto);
    return await this.gradeRepository.save(updatedGrade);
  }

  async remove(id: string): Promise<void> {
    const grade = await this.findOne(id);
    await this.gradeRepository.remove(grade);
  }
}
