import { User } from '../../users/entities/user.entity';
import { DiscussionPost } from '../../discussion-posts/entities/discussion-post.entity';
export declare class Comment {
    id: string;
    postId: string;
    post: DiscussionPost;
    userId: string;
    user: User;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
