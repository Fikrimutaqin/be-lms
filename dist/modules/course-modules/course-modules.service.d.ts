import { Repository } from 'typeorm';
import { CourseModule } from './entities/course-module.entity';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
export declare class CourseModulesService {
    private readonly moduleRepository;
    constructor(moduleRepository: Repository<CourseModule>);
    create(createCourseModuleDto: CreateCourseModuleDto): Promise<CourseModule>;
    findAll(): Promise<CourseModule[]>;
    findByCourse(courseId: string): Promise<CourseModule[]>;
    findOne(id: string): Promise<CourseModule>;
    update(id: string, updateCourseModuleDto: UpdateCourseModuleDto): Promise<CourseModule>;
    remove(id: string): Promise<void>;
}
