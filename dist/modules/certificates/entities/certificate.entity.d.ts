import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
export declare class Certificate {
    id: string;
    userId: string;
    user: User;
    courseId: string;
    course: Course;
    certificateUrl: string;
    earnedAt: Date;
    createdAt: Date;
}
