import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
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
    findOne(id: string): Promise<Notification>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<void>;
}
