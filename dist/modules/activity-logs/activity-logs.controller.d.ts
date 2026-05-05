import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { ActivityLog } from './entities/activity-log.entity';
export declare class ActivityLogsController {
    private readonly activityLogsService;
    constructor(activityLogsService: ActivityLogsService);
    create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog>;
    findAll(): Promise<ActivityLog[]>;
    findByUser(userId: string): Promise<ActivityLog[]>;
    findOne(id: string): Promise<ActivityLog>;
    remove(id: string): Promise<void>;
}
