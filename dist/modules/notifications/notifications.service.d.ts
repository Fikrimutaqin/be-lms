import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findByUser(userId: string): Promise<Notification[]>;
    findUnreadByUser(userId: string): Promise<Notification[]>;
    findOne(id: string): Promise<Notification>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<void>;
    remove(id: string): Promise<void>;
}
