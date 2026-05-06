import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    findAll(): Promise<{
        message: string;
        data: Notification[];
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: Notification[];
    }>;
    findUnreadByUser(userId: string): Promise<{
        message: string;
        data: Notification[];
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    remove(id: string): Promise<void>;
}
