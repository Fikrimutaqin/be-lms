import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly logRepository: Repository<ActivityLog>,
  ) {}

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const log = this.logRepository.create(createActivityLogDto);
    return await this.logRepository.save(log);
  }

  async findAll(): Promise<ActivityLog[]> {
    return await this.logRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<ActivityLog[]> {
    return await this.logRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ActivityLog> {
    const log = await this.logRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!log) {
      throw new NotFoundException(`Activity Log with ID "${id}" not found`);
    }

    return log;
  }

  async remove(id: string): Promise<void> {
    const log = await this.findOne(id);
    await this.logRepository.remove(log);
  }
}
