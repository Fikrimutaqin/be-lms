import { DiscussionPostsService } from './discussion-posts.service';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
import { DiscussionPost } from './entities/discussion-post.entity';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import type { Request } from 'express';
export declare class DiscussionPostsController {
    private readonly discussionPostsService;
    constructor(discussionPostsService: DiscussionPostsService);
    create(createDiscussionPostDto: CreateDiscussionPostDto, req: Request): Promise<DiscussionPost>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: DiscussionPost[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findByForum(forumId: string): Promise<{
        message: string;
        data: DiscussionPost[];
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: DiscussionPost[];
    }>;
    findOne(id: string): Promise<DiscussionPost>;
    update(id: string, updateDiscussionPostDto: UpdateDiscussionPostDto, req: Request): Promise<DiscussionPost>;
    remove(id: string, req: Request): Promise<void>;
}
