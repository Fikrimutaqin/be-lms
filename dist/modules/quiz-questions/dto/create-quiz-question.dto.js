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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuizQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const quiz_question_entity_1 = require("../entities/quiz-question.entity");
class CreateQuizQuestionDto {
    quizId;
    questionText;
    questionType;
    points;
    sequenceOrder;
}
exports.CreateQuizQuestionDto = CreateQuizQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-quiz' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateQuizQuestionDto.prototype, "quizId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What is the capital of France?' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizQuestionDto.prototype, "questionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: quiz_question_entity_1.QuestionType, example: quiz_question_entity_1.QuestionType.MULTIPLE_CHOICE }),
    (0, class_validator_1.IsEnum)(quiz_question_entity_1.QuestionType),
    __metadata("design:type", String)
], CreateQuizQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateQuizQuestionDto.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateQuizQuestionDto.prototype, "sequenceOrder", void 0);
//# sourceMappingURL=create-quiz-question.dto.js.map