import { ResourceType } from '../entities/resource.entity';
export declare class CreateResourceDto {
    courseId: string;
    title: string;
    resourceUrl: string;
    resourceType: ResourceType;
    sequenceOrder: number;
}
