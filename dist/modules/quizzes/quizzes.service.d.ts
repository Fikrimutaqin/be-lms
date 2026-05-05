import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizzesService {
    private readonly quizRepository;
    constructor(quizRepository: Repository<Quiz>);
    create(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findAll(): Promise<Quiz[]>;
    findByCourse(courseId: string): Promise<Quiz[]>;
    findOne(id: string): Promise<Quiz>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    remove(id: string): Promise<void>;
}
