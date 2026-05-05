import { User } from '../../users/entities/user.entity';
export declare class ActivityLog {
    id: string;
    userId: string;
    user: User;
    action: string;
    entityType: string;
    entityId: string;
    changes: any;
    ipAddress: string;
    createdAt: Date;
}
