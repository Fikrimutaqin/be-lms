import { User } from '../../users/entities/user.entity';
export declare class Course {
    id: string;
    instructorId: string;
    instructor: User;
    title: string;
    description: string;
    category: string;
    durationHours: number;
    createdAt: Date;
    updatedAt: Date;
}
