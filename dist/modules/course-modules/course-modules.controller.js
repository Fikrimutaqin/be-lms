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
exports.CourseModulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_modules_service_1 = require("./course-modules.service");
const create_course_module_dto_1 = require("./dto/create-course-module.dto");
const update_course_module_dto_1 = require("./dto/update-course-module.dto");
const course_module_entity_1 = require("./entities/course-module.entity");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let CourseModulesController = class CourseModulesController {
    courseModulesService;
    constructor(courseModulesService) {
        this.courseModulesService = courseModulesService;
    }
    create(createCourseModuleDto) {
        return this.courseModulesService.create(createCourseModuleDto);
    }
    findAll() {
        return this.courseModulesService.findAll();
    }
    findByCourse(courseId) {
        return this.courseModulesService.findByCourse(courseId);
    }
    findOne(id) {
        return this.courseModulesService.findOne(id);
    }
    update(id, updateCourseModuleDto) {
        return this.courseModulesService.update(id, updateCourseModuleDto);
    }
    remove(id) {
        return this.courseModulesService.remove(id);
    }
};
exports.CourseModulesController = CourseModulesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new module for a course' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: course_module_entity_1.CourseModule }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_module_dto_1.CreateCourseModuleDto]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all modules' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [course_module_entity_1.CourseModule] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all modules for a specific course' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [course_module_entity_1.CourseModule] }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a module by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: course_module_entity_1.CourseModule }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a module' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: course_module_entity_1.CourseModule }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_module_dto_1.UpdateCourseModuleDto]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a module' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Module successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseModulesController.prototype, "remove", null);
exports.CourseModulesController = CourseModulesController = __decorate([
    (0, swagger_1.ApiTags)('Course Modules'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('course-modules'),
    __metadata("design:paramtypes", [course_modules_service_1.CourseModulesService])
], CourseModulesController);
//# sourceMappingURL=course-modules.controller.js.map