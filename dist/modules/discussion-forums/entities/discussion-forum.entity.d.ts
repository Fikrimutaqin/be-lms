import { Course } from '../../courses/entities/course.entity';
export declare class DiscussionForum {
    id: string;
    courseId: string;
    course: Course;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
