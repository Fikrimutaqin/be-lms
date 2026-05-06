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
exports.DiscussionForumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const discussion_forum_entity_1 = require("./entities/discussion-forum.entity");
let DiscussionForumsService = class DiscussionForumsService {
    forumRepository;
    constructor(forumRepository) {
        this.forumRepository = forumRepository;
    }
    async create(createDiscussionForumDto) {
        const forum = this.forumRepository.create(createDiscussionForumDto);
        return await this.forumRepository.save(forum);
    }
    async findAll() {
        const forums = await this.forumRepository.find({
            relations: ['course'],
        });
        return {
            message: 'All discussion forums retrieved successfully',
            data: forums
        };
    }
    async findByCourse(courseId) {
        const forums = await this.forumRepository.find({
            where: { courseId },
            order: { createdAt: 'DESC' },
        });
        return {
            message: 'Forums for the course retrieved successfully',
            data: forums
        };
    }
    async findOne(id) {
        const forum = await this.forumRepository.findOne({
            where: { id },
            relations: ['course'],
        });
        if (!forum) {
            throw new common_1.NotFoundException(`Forum with ID "${id}" not found`);
        }
        return forum;
    }
    async update(id, updateDiscussionForumDto) {
        const forum = await this.findOne(id);
        const updatedForum = this.forumRepository.merge(forum, updateDiscussionForumDto);
        return await this.forumRepository.save(updatedForum);
    }
    async remove(id) {
        const forum = await this.findOne(id);
        await this.forumRepository.remove(forum);
    }
};
exports.DiscussionForumsService = DiscussionForumsService;
exports.DiscussionForumsService = DiscussionForumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discussion_forum_entity_1.DiscussionForum)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DiscussionForumsService);
//# sourceMappingURL=discussion-forums.service.js.map