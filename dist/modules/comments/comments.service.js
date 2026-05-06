"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const discussion_post_entity_1 = require("../discussion-posts/entities/discussion-post.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CommentsService = class CommentsService {
    commentRepository;
    postRepository;
    constructor(commentRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }
    async create(createCommentDto, user) {
        const comment = this.commentRepository.create({
            ...createCommentDto,
            userId: user.id,
        });
        const savedComment = await this.commentRepository.save(comment);
        await this.postRepository.increment({ id: createCommentDto.postId }, 'replyCount', 1);
        return savedComment;
    }
    async findAll() {
        const comments = await this.commentRepository.find({
            relations: ['user', 'post'],
        });
        return {
            message: 'All comments retrieved successfully',
            data: comments
        };
    }
    async findByPost(postId) {
        const comments = await this.commentRepository.find({
            where: { postId },
            relations: ['user'],
            order: { createdAt: 'ASC' },
        });
        return {
            message: 'Comments for the post retrieved successfully',
            data: comments
        };
    }
    async findOne(id) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'post'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID "${id}" not found`);
        }
        return comment;
    }
    async update(id, updateCommentDto, user) {
        const comment = await this.findOne(id);
        if (comment.userId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to update this comment');
        }
        const updatedComment = this.commentRepository.merge(comment, updateCommentDto);
        return await this.commentRepository.save(updatedComment);
    }
    async remove(id, user) {
        const comment = await this.findOne(id);
        if (comment.userId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to delete this comment');
        }
        await this.commentRepository.remove(comment);
        await this.postRepository.decrement({ id: comment.postId }, 'replyCount', 1);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(discussion_post_entity_1.DiscussionPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map