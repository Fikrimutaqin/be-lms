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
exports.Grade = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const submission_entity_1 = require("../../submissions/entities/submission.entity");
const quiz_answer_entity_1 = require("../../quiz-answers/entities/quiz-answer.entity");
let Grade = class Grade {
    id;
    userId;
    user;
    submissionId;
    submission;
    quizAnswerId;
    quizAnswer;
    score;
    gradeLetter;
    feedback;
    gradedAt;
    createdAt;
    updatedAt;
};
exports.Grade = Grade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Grade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Grade.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Grade.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_id', nullable: true }),
    __metadata("design:type", String)
], Grade.prototype, "submissionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => submission_entity_1.Submission, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'submission_id' }),
    __metadata("design:type", submission_entity_1.Submission)
], Grade.prototype, "submission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quiz_answer_id', nullable: true }),
    __metadata("design:type", String)
], Grade.prototype, "quizAnswerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_answer_entity_1.QuizAnswer, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'quiz_answer_id' }),
    __metadata("design:type", quiz_answer_entity_1.QuizAnswer)
], Grade.prototype, "quizAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Grade.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_letter', length: 2, nullable: true }),
    __metadata("design:type", String)
], Grade.prototype, "gradeLetter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Grade.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'graded_at' }),
    __metadata("design:type", Date)
], Grade.prototype, "gradedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Grade.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Grade.prototype, "updatedAt", void 0);
exports.Grade = Grade = __decorate([
    (0, typeorm_1.Entity)('grades'),
    (0, typeorm_1.Check)(`"submission_id" IS NOT NULL OR "quiz_answer_id" IS NOT NULL`)
], Grade);
//# sourceMappingURL=grade.entity.js.map