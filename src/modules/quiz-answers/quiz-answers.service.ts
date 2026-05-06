import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';

@Injectable()
export class QuizAnswersService {
  constructor(
    @InjectRepository(QuizAnswer)
    private readonly answerRepository: Repository<QuizAnswer>,
  ) { }

  /**
   * Membuat pilihan jawaban kuis baru.
   */
  async create(createQuizAnswerDto: CreateQuizAnswerDto): Promise<QuizAnswer> {
    const answer = this.answerRepository.create(createQuizAnswerDto);
    return await this.answerRepository.save(answer);
  }

  /**
   * Mengambil semua daftar jawaban.
   */
  async findAll() {
    const answers = await this.answerRepository.find({
      relations: ['quizQuestion'],
    });
    return {
      message: 'All quiz answers retrieved successfully',
      data: answers
    };
  }

  /**
   * Mengambil semua pilihan jawaban untuk satu pertanyaan kuis tertentu.
   */
  async findByQuestion(quizQuestionId: string) {
    const answers = await this.answerRepository.find({
      where: { quizQuestionId },
    });
    return {
      message: 'Answers for the question retrieved successfully',
      data: answers
    };
  }

  /**
   * Mencari detail satu jawaban.
   */
  async findOne(id: string): Promise<QuizAnswer> {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['quizQuestion'],
    });

    if (!answer) {
      throw new NotFoundException(`Quiz Answer with ID "${id}" not found`);
    }

    return answer;
  }

  /**
   * Memperbarui jawaban.
   */
  async update(id: string, updateQuizAnswerDto: UpdateQuizAnswerDto): Promise<QuizAnswer> {
    const answer = await this.findOne(id);
    const updatedAnswer = this.answerRepository.merge(answer, updateQuizAnswerDto);
    return await this.answerRepository.save(updatedAnswer);
  }

  /**
   * Menghapus jawaban.
   */
  async remove(id: string): Promise<void> {
    const answer = await this.findOne(id);
    await this.answerRepository.remove(answer);
  }
}
