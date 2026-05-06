import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class ActivityLogsService {
    private readonly logRepository;
    constructor(logRepository: Repository<ActivityLog>);
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
