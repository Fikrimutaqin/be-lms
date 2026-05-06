import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findAll(): Promise<{
        message: string;
        data: Quiz[];
    }>;
    findByCourse(courseId: string): Promise<{
        message: string;
        data: Quiz[];
    }>;
    findOne(id: string): Promise<Quiz>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    remove(id: string): Promise<void>;
}
