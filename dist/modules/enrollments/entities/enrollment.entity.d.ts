import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
export declare enum EnrollmentStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    DROPPED = "dropped"
}
export declare class Enrollment {
    id: string;
    userId: string;
    user: User;
    courseId: string;
    course: Course;
    status: EnrollmentStatus;
    enrolledAt: Date;
    completedAt: Date;
}
