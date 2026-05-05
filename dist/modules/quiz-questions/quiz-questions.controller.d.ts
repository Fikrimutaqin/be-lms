import { QuizQuestionsService } from './quiz-questions.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';
export declare class QuizQuestionsController {
    private readonly quizQuestionsService;
    constructor(quizQuestionsService: QuizQuestionsService);
    create(createQuizQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion>;
    findAll(): Promise<QuizQuestion[]>;
    findByQuiz(quizId: string): Promise<QuizQuestion[]>;
    findOne(id: string): Promise<QuizQuestion>;
    update(id: string, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion>;
    remove(id: string): Promise<void>;
}
