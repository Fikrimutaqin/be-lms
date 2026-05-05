"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionForumsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const discussion_forums_service_1 = require("./discussion-forums.service");
const discussion_forums_controller_1 = require("./discussion-forums.controller");
const discussion_forum_entity_1 = require("./entities/discussion-forum.entity");
let DiscussionForumsModule = class DiscussionForumsModule {
};
exports.DiscussionForumsModule = DiscussionForumsModule;
exports.DiscussionForumsModule = DiscussionForumsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([discussion_forum_entity_1.DiscussionForum])],
        controllers: [discussion_forums_controller_1.DiscussionForumsController],
        providers: [discussion_forums_service_1.DiscussionForumsService],
        exports: [discussion_forums_service_1.DiscussionForumsService],
    })
], DiscussionForumsModule);
//# sourceMappingURL=discussion-forums.module.js.map