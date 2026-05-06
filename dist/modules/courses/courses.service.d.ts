import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseStats } from './entities/course-stats.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class CoursesService {
    private readonly courseRepository;
    private readonly statsRepository;
    constructor(courseRepository: Repository<Course>, statsRepository: Repository<CourseStats>);
    create(createCourseDto: CreateCourseDto, user: any): Promise<Course>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: Course[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findOne(id: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto, user: any): Promise<Course>;
    remove(id: string, user: any): Promise<void>;
    getStats(): Promise<CourseStats[]>;
}
