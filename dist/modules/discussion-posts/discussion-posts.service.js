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
exports.DiscussionPostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const discussion_post_entity_1 = require("./entities/discussion-post.entity");
const user_entity_1 = require("../users/entities/user.entity");
let DiscussionPostsService = class DiscussionPostsService {
    postRepository;
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(createDiscussionPostDto, user) {
        const post = this.postRepository.create({
            ...createDiscussionPostDto,
            userId: user.id,
        });
        return await this.postRepository.save(post);
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const [items, totalItems] = await this.postRepository.findAndCount({
            take: limit,
            skip: skip,
            relations: ['user', 'forum'],
            order: { createdAt: 'DESC' },
        });
        const totalPages = Math.ceil(totalItems / limit);
        return {
            message: 'Discussion posts retrieved successfully',
            data: items,
            meta: {
                totalItems,
                itemCount: items.length,
                itemsPerPage: Number(limit),
                totalPages,
                currentPage: Number(page),
            },
        };
    }
    async findByForum(forumId) {
        const posts = await this.postRepository.find({
            where: { forumId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
        return {
            message: 'Forum posts retrieved successfully',
            data: posts
        };
    }
    async findByUser(userId) {
        const posts = await this.postRepository.find({
            where: { userId },
            relations: ['forum'],
            order: { createdAt: 'DESC' },
        });
        return {
            message: 'User posts retrieved successfully',
            data: posts
        };
    }
    async findOne(id) {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['user', 'forum'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID "${id}" not found`);
        }
        post.viewCount += 1;
        await this.postRepository.save(post);
        return post;
    }
    async update(id, updateDiscussionPostDto, user) {
        const post = await this.findOne(id);
        if (post.userId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to update this post');
        }
        const updatedPost = this.postRepository.merge(post, updateDiscussionPostDto);
        return await this.postRepository.save(updatedPost);
    }
    async remove(id, user) {
        const post = await this.findOne(id);
        if (post.userId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to delete this post');
        }
        await this.postRepository.remove(post);
    }
};
exports.DiscussionPostsService = DiscussionPostsService;
exports.DiscussionPostsService = DiscussionPostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discussion_post_entity_1.DiscussionPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DiscussionPostsService);
//# sourceMappingURL=discussion-posts.service.js.map