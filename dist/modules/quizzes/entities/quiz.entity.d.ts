import { Course } from '../../courses/entities/course.entity';
export declare class Quiz {
    id: string;
    courseId: string;
    course: Course;
    title: string;
    description: string;
    totalScore: number;
    timeLimitMinutes: number;
    shuffleQuestions: boolean;
    createdAt: Date;
    updatedAt: Date;
}
