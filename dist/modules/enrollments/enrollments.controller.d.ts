import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import type { Request } from 'express';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    getStudentProgress(userId: string): Promise<{
        message: string;
        data: import("./entities/student-progress.entity").StudentProgress[];
    }>;
    getCourseProgress(courseId: string): Promise<{
        message: string;
        data: import("./entities/student-progress.entity").StudentProgress[];
    }>;
    create(createEnrollmentDto: CreateEnrollmentDto, req: Request): Promise<Enrollment>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: Enrollment[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: Enrollment[];
    }>;
    findOne(id: string): Promise<Enrollment>;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment>;
    remove(id: string): Promise<void>;
}
