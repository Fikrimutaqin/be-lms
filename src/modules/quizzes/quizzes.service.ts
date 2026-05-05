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

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto);
    return await this.quizRepository.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find({
      relations: ['course'],
    });
  }

  async findByCourse(courseId: string): Promise<Quiz[]> {
    return await this.quizRepository.find({
      where: { courseId },
      order: { createdAt: 'DESC' },
    });
  }

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

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOne(id);
    const updatedQuiz = this.quizRepository.merge(quiz, updateQuizDto);
    return await this.quizRepository.save(updatedQuiz);
  }

  async remove(id: string): Promise<void> {
    const quiz = await this.findOne(id);
    await this.quizRepository.remove(quiz);
  }
}
