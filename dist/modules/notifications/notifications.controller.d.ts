import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findByUser(userId: string): Promise<Notification[]>;
    findUnreadByUser(userId: string): Promise<Notification[]>;
    markAllAsRead(userId: string): Promise<void>;
    findOne(id: string): Promise<Notification>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    remove(id: string): Promise<void>;
}
