import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getStats(): Promise<import("./entities/course-stats.entity").CourseStats[]>;
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<void>;
}
