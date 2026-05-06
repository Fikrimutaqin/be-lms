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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lessons_service_1 = require("./lessons.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const lesson_entity_1 = require("./entities/lesson.entity");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let LessonsController = class LessonsController {
    lessonsService;
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    create(createLessonDto) {
        return this.lessonsService.create(createLessonDto);
    }
    findAll() {
        return this.lessonsService.findAll();
    }
    findByModule(moduleId) {
        return this.lessonsService.findByModule(moduleId);
    }
    findOne(id) {
        return this.lessonsService.findOne(id);
    }
    update(id, updateLessonDto) {
        return this.lessonsService.update(id, updateLessonDto);
    }
    remove(id) {
        return this.lessonsService.remove(id);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lesson' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: lesson_entity_1.Lesson }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [lesson_entity_1.Lesson] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('module/:moduleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons for a specific module' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [lesson_entity_1.Lesson] }),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findByModule", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a lesson by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: lesson_entity_1.Lesson }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lesson' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: lesson_entity_1.Lesson }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lesson' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Lesson successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "remove", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map