import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CourseModule } from './entities/course-module.entity';
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    create(createCourseModuleDto: CreateCourseModuleDto): Promise<CourseModule>;
    findAll(): Promise<CourseModule[]>;
    findByCourse(courseId: string): Promise<CourseModule[]>;
    findOne(id: string): Promise<CourseModule>;
    update(id: string, updateCourseModuleDto: UpdateCourseModuleDto): Promise<CourseModule>;
    remove(id: string): Promise<void>;
}
