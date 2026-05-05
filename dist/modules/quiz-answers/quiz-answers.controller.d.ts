import { QuizAnswersService } from './quiz-answers.service';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';
import { QuizAnswer } from './entities/quiz-answer.entity';
export declare class QuizAnswersController {
    private readonly quizAnswersService;
    constructor(quizAnswersService: QuizAnswersService);
    create(createQuizAnswerDto: CreateQuizAnswerDto): Promise<QuizAnswer>;
    findAll(): Promise<QuizAnswer[]>;
    findByQuestion(questionId: string): Promise<QuizAnswer[]>;
    findByUser(userId: string): Promise<QuizAnswer[]>;
    findOne(id: string): Promise<QuizAnswer>;
    update(id: string, updateQuizAnswerDto: UpdateQuizAnswerDto): Promise<QuizAnswer>;
    remove(id: string): Promise<void>;
}
