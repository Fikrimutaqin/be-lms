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
exports.DiscussionForumsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discussion_forums_service_1 = require("./discussion-forums.service");
const create_discussion_forum_dto_1 = require("./dto/create-discussion-forum.dto");
const update_discussion_forum_dto_1 = require("./dto/update-discussion-forum.dto");
const discussion_forum_entity_1 = require("./entities/discussion-forum.entity");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let DiscussionForumsController = class DiscussionForumsController {
    discussionForumsService;
    constructor(discussionForumsService) {
        this.discussionForumsService = discussionForumsService;
    }
    create(createDiscussionForumDto) {
        return this.discussionForumsService.create(createDiscussionForumDto);
    }
    findAll() {
        return this.discussionForumsService.findAll();
    }
    findByCourse(courseId) {
        return this.discussionForumsService.findByCourse(courseId);
    }
    findOne(id) {
        return this.discussionForumsService.findOne(id);
    }
    update(id, updateDiscussionForumDto) {
        return this.discussionForumsService.update(id, updateDiscussionForumDto);
    }
    remove(id) {
        return this.discussionForumsService.remove(id);
    }
};
exports.DiscussionForumsController = DiscussionForumsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new discussion forum' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: discussion_forum_entity_1.DiscussionForum }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discussion_forum_dto_1.CreateDiscussionForumDto]),
    __metadata("design:returntype", void 0)
], DiscussionForumsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all discussion forums' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [discussion_forum_entity_1.DiscussionForum] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscussionForumsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all forums for a specific course' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [discussion_forum_entity_1.DiscussionForum] }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionForumsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a discussion forum by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: discussion_forum_entity_1.DiscussionForum }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionForumsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a discussion forum' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: discussion_forum_entity_1.DiscussionForum }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discussion_forum_dto_1.UpdateDiscussionForumDto]),
    __metadata("design:returntype", void 0)
], DiscussionForumsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a discussion forum' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Forum successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscussionForumsController.prototype, "remove", null);
exports.DiscussionForumsController = DiscussionForumsController = __decorate([
    (0, swagger_1.ApiTags)('Discussion Forums'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('discussion-forums'),
    __metadata("design:paramtypes", [discussion_forums_service_1.DiscussionForumsService])
], DiscussionForumsController);
//# sourceMappingURL=discussion-forums.controller.js.map