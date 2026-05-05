import { CourseModule } from '../../course-modules/entities/course-module.entity';
export declare class Lesson {
    id: string;
    moduleId: string;
    module: CourseModule;
    title: string;
    content: string;
    sequenceOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
