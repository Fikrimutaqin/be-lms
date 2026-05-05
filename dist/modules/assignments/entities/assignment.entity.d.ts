import { Course } from '../../courses/entities/course.entity';
export declare class Assignment {
    id: string;
    courseId: string;
    course: Course;
    title: string;
    description: string;
    dueDate: Date;
    maxScore: number;
    createdAt: Date;
    updatedAt: Date;
}
