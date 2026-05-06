import type { Request } from 'express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getStats(): Promise<import("./entities/course-stats.entity").CourseStats[]>;
    create(createCourseDto: CreateCourseDto, req: Request): Promise<Course>;
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
    update(id: string, updateCourseDto: UpdateCourseDto, req: Request): Promise<Course>;
    remove(id: string, req: Request): Promise<void>;
}
