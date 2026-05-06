import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { ActivityLog } from './entities/activity-log.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@ApiTags('Activity Logs')
@ApiBearerAuth()
@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) { }

  /**
   * Mencatat log aktivitas baru.
   * Biasanya dipanggil oleh sistem secara internal saat user melakukan aksi tertentu.
   */
  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new activity log' })
  @ApiResponse({ status: 201, type: ActivityLog })
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogsService.create(createActivityLogDto);
  }

  /**
   * Mengambil semua daftar log aktivitas (Hanya Admin).
   * Mendukung pagination karena data log biasanya sangat besar.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all activity logs' })
  @ApiResponse({ status: 200, type: [ActivityLog] })
  findAll(@Query() query: PaginationQueryDto) {
    return this.activityLogsService.findAll(query);
  }

  /**
   * Mengambil riwayat aktivitas milik satu user tertentu.
   */
  @Get('user/:userId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get activity logs for a specific user' })
  @ApiResponse({ status: 200, type: [ActivityLog] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.activityLogsService.findByUser(userId);
  }

  /**
   * Mengambil detail satu baris log.
   */
  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get an activity log by id' })
  @ApiResponse({ status: 200, type: ActivityLog })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.activityLogsService.findOne(id);
  }

  /**
   * Menghapus log lama (Hanya Admin).
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an activity log' })
  @ApiResponse({ status: 204, description: 'Log successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.activityLogsService.remove(id);
  }
}
