import { User } from '../../users/entities/user.entity';
export declare enum NotificationType {
    ASSIGNMENT = "assignment",
    ANNOUNCEMENT = "announcement",
    GRADE = "grade",
    COMMENT = "comment",
    SUBMISSION = "submission",
    ENROLLMENT = "enrollment"
}
export declare class Notification {
    id: string;
    userId: string;
    user: User;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    referenceId: string;
    createdAt: Date;
    readAt: Date;
}
