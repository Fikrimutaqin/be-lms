import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { StudentProgress } from './entities/student-progress.entity';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class EnrollmentsService {
    private readonly enrollmentRepository;
    private readonly progressRepository;
    constructor(enrollmentRepository: Repository<Enrollment>, progressRepository: Repository<StudentProgress>);
    create(createEnrollmentDto: CreateEnrollmentDto, user: any): Promise<Enrollment>;
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
    getStudentProgress(userId: string): Promise<{
        message: string;
        data: StudentProgress[];
    }>;
    getCourseProgress(courseId: string): Promise<{
        message: string;
        data: StudentProgress[];
    }>;
}
