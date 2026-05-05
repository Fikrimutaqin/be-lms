import { User } from '../../users/entities/user.entity';
import { DiscussionForum } from '../../discussion-forums/entities/discussion-forum.entity';
export declare class DiscussionPost {
    id: string;
    forumId: string;
    forum: DiscussionForum;
    userId: string;
    user: User;
    title: string;
    content: string;
    replyCount: number;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
}
