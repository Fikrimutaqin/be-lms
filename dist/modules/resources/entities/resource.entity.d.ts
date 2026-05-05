import { Course } from '../../courses/entities/course.entity';
export declare enum ResourceType {
    PDF = "pdf",
    VIDEO = "video",
    LINK = "link",
    DOCUMENT = "document",
    IMAGE = "image"
}
export declare class Resource {
    id: string;
    courseId: string;
    course: Course;
    title: string;
    resourceUrl: string;
    resourceType: ResourceType;
    sequenceOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
