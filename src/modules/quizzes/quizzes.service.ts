import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  /**
   * Membuat kuis baru.
   */
  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto);
    return await this.quizRepository.save(quiz);
  }

  /**
   * Mengambil semua daftar kuis.
   */
  async findAll() {
    const quizzes = await this.quizRepository.find({
      relations: ['course'],
    });
    return {
      message: 'All quizzes retrieved successfully',
      data: quizzes
    };
  }

  /**
   * Mengambil semua kuis yang ada di dalam kursus tertentu.
   */
  async findByCourse(courseId: string) {
    const quizzes = await this.quizRepository.find({
      where: { courseId },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Quizzes for the course retrieved successfully',
      data: quizzes
    };
  }

  /**
   * Mencari detail satu kuis.
   */
  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }

    return quiz;
  }

  /**
   * Memperbarui pengaturan kuis.
   */
  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOne(id);
    const updatedQuiz = this.quizRepository.merge(quiz, updateQuizDto);
    return await this.quizRepository.save(updatedQuiz);
  }

  /**
   * Menghapus kuis.
   */
  async remove(id: string): Promise<void> {
    const quiz = await this.findOne(id);
    await this.quizRepository.remove(quiz);
  }
}
