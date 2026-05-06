import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  /**
   * Membuat notifikasi baru.
   */
  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create(createNotificationDto);
    return await this.notificationRepository.save(notification);
  }

  /**
   * Mengambil semua daftar notifikasi yang ada di sistem.
   */
  async findAll() {
    const notifications = await this.notificationRepository.find({
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'All notifications retrieved successfully',
      data: notifications
    };
  }

  /**
   * Mengambil riwayat notifikasi milik user tertentu.
   */
  async findByUser(userId: string) {
    const notifications = await this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'User notifications retrieved successfully',
      data: notifications
    };
  }

  /**
   * Mengambil notifikasi yang belum dibaca (Unread).
   */
  async findUnreadByUser(userId: string) {
    const notifications = await this.notificationRepository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Unread notifications retrieved successfully',
      data: notifications
    };
  }

  /**
   * Mencari detail satu notifikasi.
   */
  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID "${id}" not found`);
    }

    return notification;
  }

  /**
   * Memperbarui status notifikasi.
   * Jika ditandai isRead: true, maka otomatis mencatat waktu readAt.
   */
  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.findOne(id);
    
    if (updateNotificationDto.isRead === true && !notification.isRead) {
      notification.readAt = new Date();
    }

    const updatedNotification = this.notificationRepository.merge(notification, updateNotificationDto);
    return await this.notificationRepository.save(updatedNotification);
  }

  /**
   * Shortcut untuk menandai satu notifikasi sebagai sudah dibaca.
   */
  async markAsRead(id: string): Promise<Notification> {
    return await this.update(id, { isRead: true });
  }

  /**
   * Menandai semua notifikasi user tersebut sebagai sudah dibaca sekaligus.
   */
  async markAllAsRead(userId: string) {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    return {
      message: 'All notifications marked as read'
    };
  }

  /**
   * Menghapus notifikasi.
   */
  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepository.remove(notification);
  }
}
