import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    getStudentProgress(userId: string): Promise<import("./entities/student-progress.entity").StudentProgress[]>;
    getCourseProgress(courseId: string): Promise<import("./entities/student-progress.entity").StudentProgress[]>;
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
    findAll(): Promise<Enrollment[]>;
    findByUser(userId: string): Promise<Enrollment[]>;
    findOne(id: string): Promise<Enrollment>;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment>;
    remove(id: string): Promise<void>;
}
