import { UsersService } from './users.service';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: import("./entities/user.entity").User[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
