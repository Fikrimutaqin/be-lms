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
exports.GradesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const grades_service_1 = require("./grades.service");
const create_grade_dto_1 = require("./dto/create-grade.dto");
const update_grade_dto_1 = require("./dto/update-grade.dto");
const grade_entity_1 = require("./entities/grade.entity");
let GradesController = class GradesController {
    gradesService;
    constructor(gradesService) {
        this.gradesService = gradesService;
    }
    create(createGradeDto) {
        return this.gradesService.create(createGradeDto);
    }
    findAll() {
        return this.gradesService.findAll();
    }
    findByUser(userId) {
        return this.gradesService.findByUser(userId);
    }
    findOne(id) {
        return this.gradesService.findOne(id);
    }
    update(id, updateGradeDto) {
        return this.gradesService.update(id, updateGradeDto);
    }
    remove(id) {
        return this.gradesService.remove(id);
    }
};
exports.GradesController = GradesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new grade' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: grade_entity_1.Grade }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Missing required reference (submission or quiz answer).' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grade_dto_1.CreateGradeDto]),
    __metadata("design:returntype", void 0)
], GradesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all grades' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [grade_entity_1.Grade] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GradesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all grades for a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [grade_entity_1.Grade] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradesController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a grade by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: grade_entity_1.Grade }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Grade not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a grade' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: grade_entity_1.Grade }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_grade_dto_1.UpdateGradeDto]),
    __metadata("design:returntype", void 0)
], GradesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a grade' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Grade successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradesController.prototype, "remove", null);
exports.GradesController = GradesController = __decorate([
    (0, swagger_1.ApiTags)('Grades'),
    (0, common_1.Controller)('grades'),
    __metadata("design:paramtypes", [grades_service_1.GradesService])
], GradesController);
//# sourceMappingURL=grades.controller.js.map