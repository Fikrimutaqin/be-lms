import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { ActivityLog } from './entities/activity-log.entity';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class ActivityLogsController {
    private readonly activityLogsService;
    constructor(activityLogsService: ActivityLogsService);
    create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: ActivityLog[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: ActivityLog[];
    }>;
    findOne(id: string): Promise<ActivityLog>;
    remove(id: string): Promise<void>;
}
