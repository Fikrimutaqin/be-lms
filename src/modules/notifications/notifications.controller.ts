import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  /**
   * Membuat notifikasi baru (Internal System).
   */
  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, type: Notification })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  /**
   * Mengambil semua notifikasi yang ada di sistem (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, type: [Notification] })
  findAll() {
    return this.notificationsService.findAll();
  }

  /**
   * Mengambil semua notifikasi milik user yang sedang login.
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all notifications for a specific user' })
  @ApiResponse({ status: 200, type: [Notification] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationsService.findByUser(userId);
  }

  /**
   * Mengambil notifikasi yang belum dibaca saja.
   * Biasanya digunakan untuk badge angka di ikon lonceng.
   */
  @Get('user/:userId/unread')
  @ApiOperation({ summary: 'Get unread notifications for a specific user' })
  @ApiResponse({ status: 200, type: [Notification] })
  findUnreadByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationsService.findUnreadByUser(userId);
  }

  /**
   * Menandai semua notifikasi user tersebut sebagai sudah dibaca.
   */
  @Post('user/:userId/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read for a specific user' })
  @ApiResponse({ status: 204, description: 'All notifications marked as read.' })
  markAllAsRead(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  /**
   * Mengambil detail satu notifikasi.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by id' })
  @ApiResponse({ status: 200, type: Notification })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.findOne(id);
  }

  /**
   * Menandai satu notifikasi tertentu sebagai sudah dibaca.
   */
  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200, type: Notification })
  markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.markAsRead(id);
  }

  /**
   * Menghapus notifikasi.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 204, description: 'Notification successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.remove(id);
  }
}
