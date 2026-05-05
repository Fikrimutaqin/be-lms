import { Repository } from 'typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
export declare class QuizQuestionsService {
    private readonly questionRepository;
    constructor(questionRepository: Repository<QuizQuestion>);
    create(createQuizQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion>;
    findAll(): Promise<QuizQuestion[]>;
    findByQuiz(quizId: string): Promise<QuizQuestion[]>;
    findOne(id: string): Promise<QuizQuestion>;
    update(id: string, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion>;
    remove(id: string): Promise<void>;
}
