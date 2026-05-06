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
exports.QuizAnswersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const quiz_answers_service_1 = require("./quiz-answers.service");
const create_quiz_answer_dto_1 = require("./dto/create-quiz-answer.dto");
const update_quiz_answer_dto_1 = require("./dto/update-quiz-answer.dto");
const quiz_answer_entity_1 = require("./entities/quiz-answer.entity");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let QuizAnswersController = class QuizAnswersController {
    quizAnswersService;
    constructor(quizAnswersService) {
        this.quizAnswersService = quizAnswersService;
    }
    create(createQuizAnswerDto) {
        return this.quizAnswersService.create(createQuizAnswerDto);
    }
    findAll() {
        return this.quizAnswersService.findAll();
    }
    findByQuestion(questionId) {
        return this.quizAnswersService.findByQuestion(questionId);
    }
    findOne(id) {
        return this.quizAnswersService.findOne(id);
    }
    update(id, updateQuizAnswerDto) {
        return this.quizAnswersService.update(id, updateQuizAnswerDto);
    }
    remove(id) {
        return this.quizAnswersService.remove(id);
    }
};
exports.QuizAnswersController = QuizAnswersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a quiz answer option' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: quiz_answer_entity_1.QuizAnswer }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_answer_dto_1.CreateQuizAnswerDto]),
    __metadata("design:returntype", void 0)
], QuizAnswersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all quiz answers' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [quiz_answer_entity_1.QuizAnswer] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuizAnswersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('question/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get answers for a specific question' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [quiz_answer_entity_1.QuizAnswer] }),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizAnswersController.prototype, "findByQuestion", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a quiz answer by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: quiz_answer_entity_1.QuizAnswer }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizAnswersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a quiz answer' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: quiz_answer_entity_1.QuizAnswer }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quiz_answer_dto_1.UpdateQuizAnswerDto]),
    __metadata("design:returntype", void 0)
], QuizAnswersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.INSTRUCTOR, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a quiz answer' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Answer successfully deleted.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizAnswersController.prototype, "remove", null);
exports.QuizAnswersController = QuizAnswersController = __decorate([
    (0, swagger_1.ApiTags)('Quiz Answers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('quiz-answers'),
    __metadata("design:paramtypes", [quiz_answers_service_1.QuizAnswersService])
], QuizAnswersController);
//# sourceMappingURL=quiz-answers.controller.js.map