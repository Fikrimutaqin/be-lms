import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { StudentProgress } from './entities/student-progress.entity';
export declare class EnrollmentsService {
    private readonly enrollmentRepository;
    private readonly progressRepository;
    constructor(enrollmentRepository: Repository<Enrollment>, progressRepository: Repository<StudentProgress>);
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
    findAll(): Promise<Enrollment[]>;
    findByUser(userId: string): Promise<Enrollment[]>;
    findOne(id: string): Promise<Enrollment>;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment>;
    remove(id: string): Promise<void>;
    getStudentProgress(userId: string): Promise<StudentProgress[]>;
    getCourseProgress(courseId: string): Promise<StudentProgress[]>;
}
