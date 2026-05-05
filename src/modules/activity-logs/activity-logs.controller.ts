import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { ActivityLog } from './entities/activity-log.entity';

@ApiTags('Activity Logs')
@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new activity log' })
  @ApiResponse({ status: 201, type: ActivityLog })
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogsService.create(createActivityLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity logs' })
  @ApiResponse({ status: 200, type: [ActivityLog] })
  findAll() {
    return this.activityLogsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get activity logs for a specific user' })
  @ApiResponse({ status: 200, type: [ActivityLog] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.activityLogsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity log by id' })
  @ApiResponse({ status: 200, type: ActivityLog })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.activityLogsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity log' })
  @ApiResponse({ status: 204, description: 'Log successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.activityLogsService.remove(id);
  }
}
