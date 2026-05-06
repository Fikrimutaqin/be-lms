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
exports.SubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const submissions_service_1 = require("./submissions.service");
const create_submission_dto_1 = require("./dto/create-submission.dto");
const update_submission_dto_1 = require("./dto/update-submission.dto");
const submission_entity_1 = require("./entities/submission.entity");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let SubmissionsController = class SubmissionsController {
    submissionsService;
    constructor(submissionsService) {
        this.submissionsService = submissionsService;
    }
    create(createSubmissionDto, req) {
        return this.submissionsService.create(createSubmissionDto, req.user);
    }
    findAll() {
        return this.submissionsService.findAll();
    }
    findByAssignment(assignmentId) {
        return this.submissionsService.findByAssignment(assignmentId);
    }
    findByUser(userId) {
        return this.submissionsService.findByUser(userId);
    }
    findOne(id) {
        return this.submissionsService.findOne(id);
    }
    update(id, updateSubmissionDto) {
        return this.submissionsService.update(id, updateSubmissionDto);
    }
    remove(id) {
        return this.submissionsService.remove(id);
    }
};
exports.SubmissionsController = SubmissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.STUDENT, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Submit an assignment' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: submission_entity_1.Submission }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_submission_dto_1.CreateSubmissionDto, Object]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all submissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [submission_entity_1.Submission] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('assignment/:assignmentId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions for a specific assignment' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [submission_entity_1.Submission] }),
    __param(0, (0, common_1.Param)('assignmentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findByAssignment", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions by a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [submission_entity_1.Submission] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a submission by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: submission_entity_1.Submission }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a submission (e.g. status or content)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: submission_entity_1.Submission }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.UpdateSubmissionDto]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a submission' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Submission successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "remove", null);
exports.SubmissionsController = SubmissionsController = __decorate([
    (0, swagger_1.ApiTags)('Submissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('submissions'),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService])
], SubmissionsController);
//# sourceMappingURL=submissions.controller.js.map