import { Course } from '../../courses/entities/course.entity';
export declare class CourseModule {
    id: string;
    courseId: string;
    course: Course;
    title: string;
    description: string;
    sequenceOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
