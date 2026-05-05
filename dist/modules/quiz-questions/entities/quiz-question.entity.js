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
exports.QuizQuestion = exports.QuestionType = void 0;
const typeorm_1 = require("typeorm");
const quiz_entity_1 = require("../../quizzes/entities/quiz.entity");
var QuestionType;
(function (QuestionType) {
    QuestionType["MULTIPLE_CHOICE"] = "multiple-choice";
    QuestionType["ESSAY"] = "essay";
    QuestionType["TRUE_FALSE"] = "true-false";
    QuestionType["SHORT_ANSWER"] = "short-answer";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
let QuizQuestion = class QuizQuestion {
    id;
    quizId;
    quiz;
    questionText;
    questionType;
    points;
    sequenceOrder;
    createdAt;
    updatedAt;
};
exports.QuizQuestion = QuizQuestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quiz_id' }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'quiz_id' }),
    __metadata("design:type", quiz_entity_1.Quiz)
], QuizQuestion.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'question_text', type: 'text' }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'question_type',
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], QuizQuestion.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 1 }),
    __metadata("design:type", Number)
], QuizQuestion.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sequence_order', type: 'integer' }),
    __metadata("design:type", Number)
], QuizQuestion.prototype, "sequenceOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QuizQuestion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], QuizQuestion.prototype, "updatedAt", void 0);
exports.QuizQuestion = QuizQuestion = __decorate([
    (0, typeorm_1.Entity)('quiz_questions')
], QuizQuestion);
//# sourceMappingURL=quiz-question.entity.js.map