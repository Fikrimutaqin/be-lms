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

  async create(createQuizQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion> {
    const question = this.questionRepository.create(createQuizQuestionDto);
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<QuizQuestion[]> {
    return await this.questionRepository.find({
      order: { sequenceOrder: 'ASC' },
    });
  }

  async findByQuiz(quizId: string): Promise<QuizQuestion[]> {
    return await this.questionRepository.find({
      where: { quizId },
      order: { sequenceOrder: 'ASC' },
    });
  }

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

  async update(id: string, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion> {
    const question = await this.findOne(id);
    const updatedQuestion = this.questionRepository.merge(question, updateQuizQuestionDto);
    return await this.questionRepository.save(updatedQuestion);
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}
