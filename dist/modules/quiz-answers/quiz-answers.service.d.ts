import { Repository } from 'typeorm';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';
export declare class QuizAnswersService {
    private readonly answerRepository;
    constructor(answerRepository: Repository<QuizAnswer>);
    create(createQuizAnswerDto: CreateQuizAnswerDto): Promise<QuizAnswer>;
    findAll(): Promise<{
        message: string;
        data: QuizAnswer[];
    }>;
    findByQuestion(quizQuestionId: string): Promise<{
        message: string;
        data: QuizAnswer[];
    }>;
    findOne(id: string): Promise<QuizAnswer>;
    update(id: string, updateQuizAnswerDto: UpdateQuizAnswerDto): Promise<QuizAnswer>;
    remove(id: string): Promise<void>;
}
