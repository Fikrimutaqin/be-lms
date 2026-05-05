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
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enrollments_service_1 = require("./enrollments.service");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const update_enrollment_dto_1 = require("./dto/update-enrollment.dto");
const enrollment_entity_1 = require("./entities/enrollment.entity");
let EnrollmentsController = class EnrollmentsController {
    enrollmentsService;
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    getStudentProgress(userId) {
        return this.enrollmentsService.getStudentProgress(userId);
    }
    getCourseProgress(courseId) {
        return this.enrollmentsService.getCourseProgress(courseId);
    }
    create(createEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentDto);
    }
    findAll() {
        return this.enrollmentsService.findAll();
    }
    findByUser(userId) {
        return this.enrollmentsService.findByUser(userId);
    }
    findOne(id) {
        return this.enrollmentsService.findOne(id);
    }
    update(id, updateEnrollmentDto) {
        return this.enrollmentsService.update(id, updateEnrollmentDto);
    }
    remove(id) {
        return this.enrollmentsService.remove(id);
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Get)('user/:userId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get progress for a specific user across all courses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return student progress stats.' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getStudentProgress", null);
__decorate([
    (0, common_1.Get)('course/:courseId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get progress for all students in a specific course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return course-wide student progress stats.' }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getCourseProgress", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Enroll a user in a course' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully enrolled.', type: enrollment_entity_1.Enrollment }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already enrolled.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all enrollments' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [enrollment_entity_1.Enrollment] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrollments for a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [enrollment_entity_1.Enrollment] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrollment by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: enrollment_entity_1.Enrollment }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update enrollment status' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: enrollment_entity_1.Enrollment }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enrollment_dto_1.UpdateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove an enrollment' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Enrollment removed.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "remove", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, swagger_1.ApiTags)('Enrollments'),
    (0, common_1.Controller)('enrollments'),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollments.controller.js.map