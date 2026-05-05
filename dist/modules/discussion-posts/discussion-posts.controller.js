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
exports.DiscussionPostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discussion_posts_service_1 = require("./discussion-posts.service");
const create_discussion_post_dto_1 = require("./dto/create-discussion-post.dto");
const update_discussion_post_dto_1 = require("./dto/update-discussion-post.dto");
const discussion_post_entity_1 = require("./entities/discussion-post.entity");
let DiscussionPostsController = class DiscussionPostsController {
    discussionPostsService;
    constructor(discussionPostsService) {
        this.discussionPostsService = discussionPostsService;
    }
    create(createDiscussionPostDto) {
        return this.discussionPostsService.create(createDiscussionPostDto);
    }
    findAll() {
        return this.discussionPostsService.findAll();
    }
    findByForum(forumId) {
        return this.discussionPostsService.findByForum(forumId);
    }
    findByUser(userId) {
        return this.discussionPostsService.findByUser(userId);
    }
    findOne(id) {
        return this.discussionPostsService.findOne(id);
    }
    update(id, updateDiscussionPostDto) {
        return this.discussionPostsService.update(id, updateDiscussionPostDto);
    }
    remove(id) {
        return this.discussionPostsService.remove(id);
    }
};
exports.DiscussionPostsController = DiscussionPostsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new discussion post' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: discussion_post_entity_1.DiscussionPost }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discussion_post_dto_1.CreateDiscussionPostDto]),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all discussion posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [discussion_post_entity_1.DiscussionPost] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('forum/:forumId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts for a specific forum' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [discussion_post_entity_1.DiscussionPost] }),
    __param(0, (0, common_1.Param)('forumId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "findByForum", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts by a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [discussion_post_entity_1.DiscussionPost] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a discussion post by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: discussion_post_entity_1.DiscussionPost }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a discussion post' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: discussion_post_entity_1.DiscussionPost }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discussion_post_dto_1.UpdateDiscussionPostDto]),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a discussion post' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Post successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionPostsController.prototype, "remove", null);
exports.DiscussionPostsController = DiscussionPostsController = __decorate([
    (0, swagger_1.ApiTags)('Discussion Posts'),
    (0, common_1.Controller)('discussion-posts'),
    __metadata("design:paramtypes", [discussion_posts_service_1.DiscussionPostsService])
], DiscussionPostsController);
//# sourceMappingURL=discussion-posts.controller.js.map