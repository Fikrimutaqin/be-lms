import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
export declare class ActivityLogsService {
    private readonly logRepository;
    constructor(logRepository: Repository<ActivityLog>);
    create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog>;
    findAll(): Promise<ActivityLog[]>;
    findByUser(userId: string): Promise<ActivityLog[]>;
    findOne(id: string): Promise<ActivityLog>;
    remove(id: string): Promise<void>;
}
