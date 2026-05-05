import { EnrollmentStatus } from '../entities/enrollment.entity';
export declare class CreateEnrollmentDto {
    userId: string;
    courseId: string;
    status?: EnrollmentStatus;
}
