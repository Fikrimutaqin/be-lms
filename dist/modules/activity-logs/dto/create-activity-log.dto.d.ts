export declare class CreateActivityLogDto {
    userId: string;
    action: string;
    entityType: string;
    entityId?: string;
    changes?: any;
    ipAddress?: string;
}
