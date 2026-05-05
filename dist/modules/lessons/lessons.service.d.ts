import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsService {
    private readonly lessonRepository;
    constructor(lessonRepository: Repository<Lesson>);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    findAll(): Promise<Lesson[]>;
    findByModule(moduleId: string): Promise<Lesson[]>;
    findOne(id: string): Promise<Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: string): Promise<void>;
}
