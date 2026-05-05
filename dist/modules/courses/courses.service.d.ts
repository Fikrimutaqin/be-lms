import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseStats } from './entities/course-stats.entity';
export declare class CoursesService {
    private readonly courseRepository;
    private readonly statsRepository;
    constructor(courseRepository: Repository<Course>, statsRepository: Repository<CourseStats>);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<void>;
    getStats(): Promise<CourseStats[]>;
}
