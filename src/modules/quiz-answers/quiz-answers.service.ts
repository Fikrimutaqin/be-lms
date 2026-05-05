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

  async create(createQuizAnswerDto: CreateQuizAnswerDto): Promise<QuizAnswer> {
    const answer = this.answerRepository.create(createQuizAnswerDto);
    return await this.answerRepository.save(answer);
  }

  async findAll(): Promise<QuizAnswer[]> {
    return await this.answerRepository.find({
      relations: ['user', 'quizQuestion'],
    });
  }

  async findByQuestion(quizQuestionId: string): Promise<QuizAnswer[]> {
    return await this.answerRepository.find({
      where: { quizQuestionId },
      relations: ['user'],
    });
  }

  async findByUser(userId: string): Promise<QuizAnswer[]> {
    return await this.answerRepository.find({
      where: { userId },
      relations: ['quizQuestion'],
    });
  }

  async findOne(id: string): Promise<QuizAnswer> {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['user', 'quizQuestion'],
    });

    if (!answer) {
      throw new NotFoundException(`Quiz Answer with ID "${id}" not found`);
    }

    return answer;
  }

  async update(id: string, updateQuizAnswerDto: UpdateQuizAnswerDto): Promise<QuizAnswer> {
    const answer = await this.findOne(id);
    const updatedAnswer = this.answerRepository.merge(answer, updateQuizAnswerDto);
    return await this.answerRepository.save(updatedAnswer);
  }

  async remove(id: string): Promise<void> {
    const answer = await this.findOne(id);
    await this.answerRepository.remove(answer);
  }
}
