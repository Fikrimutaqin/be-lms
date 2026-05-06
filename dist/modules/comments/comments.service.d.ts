import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DiscussionPost } from '../discussion-posts/entities/discussion-post.entity';
export declare class CommentsService {
    private readonly commentRepository;
    private readonly postRepository;
    constructor(commentRepository: Repository<Comment>, postRepository: Repository<DiscussionPost>);
    create(createCommentDto: CreateCommentDto, user: any): Promise<Comment>;
    findAll(): Promise<{
        message: string;
        data: Comment[];
    }>;
    findByPost(postId: string): Promise<{
        message: string;
        data: Comment[];
    }>;
    findOne(id: string): Promise<Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto, user: any): Promise<Comment>;
    remove(id: string, user: any): Promise<void>;
}
