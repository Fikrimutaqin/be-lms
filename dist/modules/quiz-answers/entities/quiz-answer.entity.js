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
exports.QuizAnswer = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const quiz_question_entity_1 = require("../../quiz-questions/entities/quiz-question.entity");
let QuizAnswer = class QuizAnswer {
    id;
    quizQuestionId;
    quizQuestion;
    userId;
    user;
    answerText;
    score;
    answeredAt;
    createdAt;
};
exports.QuizAnswer = QuizAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizAnswer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quiz_question_id' }),
    __metadata("design:type", String)
], QuizAnswer.prototype, "quizQuestionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_question_entity_1.QuizQuestion, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'quiz_question_id' }),
    __metadata("design:type", quiz_question_entity_1.QuizQuestion)
], QuizAnswer.prototype, "quizQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], QuizAnswer.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], QuizAnswer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answer_text', type: 'text' }),
    __metadata("design:type", String)
], QuizAnswer.prototype, "answerText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], QuizAnswer.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'answered_at' }),
    __metadata("design:type", Date)
], QuizAnswer.prototype, "answeredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QuizAnswer.prototype, "createdAt", void 0);
exports.QuizAnswer = QuizAnswer = __decorate([
    (0, typeorm_1.Entity)('quiz_answers')
], QuizAnswer);
//# sourceMappingURL=quiz-answer.entity.js.map