import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import type { Request } from 'express';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, req: Request): Promise<Comment>;
    findAll(): Promise<{
        message: string;
        data: Comment[];
    }>;
    findByPost(postId: string): Promise<{
        message: string;
        data: Comment[];
    }>;
    findOne(id: string): Promise<Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto, req: Request): Promise<Comment>;
    remove(id: string, req: Request): Promise<void>;
}
