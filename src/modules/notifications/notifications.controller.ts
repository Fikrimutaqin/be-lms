import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, type: Notification })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, type: [Notification] })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all notifications for a specific user' })
  @ApiResponse({ status: 200, type: [Notification] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationsService.findByUser(userId);
  }

  @Get('user/:userId/unread')
  @ApiOperation({ summary: 'Get unread notifications for a specific user' })
  @ApiResponse({ status: 200, type: [Notification] })
  findUnreadByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationsService.findUnreadByUser(userId);
  }

  @Post('user/:userId/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read for a specific user' })
  @ApiResponse({ status: 204, description: 'All notifications marked as read.' })
  markAllAsRead(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by id' })
  @ApiResponse({ status: 200, type: Notification })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification (e.g. mark as read)' })
  @ApiResponse({ status: 200, type: Notification })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200, type: Notification })
  markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 204, description: 'Notification successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.remove(id);
  }
}
