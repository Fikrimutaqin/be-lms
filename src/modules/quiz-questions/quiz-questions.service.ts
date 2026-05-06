import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionsService {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly questionRepository: Repository<QuizQuestion>,
  ) {}

  /**
   * Membuat pertanyaan kuis baru.
   */
  async create(createQuizQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion> {
    const question = this.questionRepository.create(createQuizQuestionDto);
    return await this.questionRepository.save(question);
  }

  /**
   * Mengambil semua daftar pertanyaan.
   */
  async findAll() {
    const questions = await this.questionRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'All quiz questions retrieved successfully',
      data: questions
    };
  }

  /**
   * Mengambil semua pertanyaan milik satu kuis tertentu.
   */
  async findByQuiz(quizId: string) {
    const questions = await this.questionRepository.find({
      where: { quizId },
      order: { sequenceOrder: 'ASC' },
    });
    return {
      message: 'Questions for the quiz retrieved successfully',
      data: questions
    };
  }

  /**
   * Mencari detail satu pertanyaan.
   */
  async findOne(id: string): Promise<QuizQuestion> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['quiz'],
    });

    if (!question) {
      throw new NotFoundException(`Quiz Question with ID "${id}" not found`);
    }

    return question;
  }

  /**
   * Memperbarui pertanyaan.
   */
  async update(id: string, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion> {
    const question = await this.findOne(id);
    const updatedQuestion = this.questionRepository.merge(question, updateQuizQuestionDto);
    return await this.questionRepository.save(updatedQuestion);
  }

  /**
   * Menghapus pertanyaan.
   */
  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}
