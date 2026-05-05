"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionPostsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const discussion_posts_service_1 = require("./discussion-posts.service");
const discussion_posts_controller_1 = require("./discussion-posts.controller");
const discussion_post_entity_1 = require("./entities/discussion-post.entity");
let DiscussionPostsModule = class DiscussionPostsModule {
};
exports.DiscussionPostsModule = DiscussionPostsModule;
exports.DiscussionPostsModule = DiscussionPostsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([discussion_post_entity_1.DiscussionPost])],
        controllers: [discussion_posts_controller_1.DiscussionPostsController],
        providers: [discussion_posts_service_1.DiscussionPostsService],
        exports: [discussion_posts_service_1.DiscussionPostsService],
    })
], DiscussionPostsModule);
//# sourceMappingURL=discussion-posts.module.js.map