import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    findAll(): Promise<{
        message: string;
        data: Lesson[];
    }>;
    findByModule(moduleId: string): Promise<{
        message: string;
        data: Lesson[];
    }>;
    findOne(id: string): Promise<Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: string): Promise<void>;
}
