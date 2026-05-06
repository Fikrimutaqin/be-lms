import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly logRepository: Repository<ActivityLog>,
  ) {}

  /**
   * Menyimpan log aktivitas baru ke database.
   */
  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const log = this.logRepository.create(createActivityLogDto);
    return await this.logRepository.save(log);
  }

  /**
   * Mengambil semua log aktivitas dengan pagination.
   */
  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.logRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Activity logs retrieved successfully',
      data: items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: Number(limit),
        totalPages,
        currentPage: Number(page),
      },
    };
  }

  /**
   * Mengambil riwayat log aktivitas untuk satu user tertentu.
   */
  async findByUser(userId: string) {
    const logs = await this.logRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'User activity logs retrieved successfully',
      data: logs
    };
  }

  /**
   * Mencari detail satu log aktivitas.
   */
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

  /**
   * Menghapus log (biasanya untuk housekeeping data lama).
   */
  async remove(id: string): Promise<void> {
    const log = await this.findOne(id);
    await this.logRepository.remove(log);
  }
}
