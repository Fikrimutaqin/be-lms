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
exports.Quiz = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entities/course.entity");
let Quiz = class Quiz {
    id;
    courseId;
    course;
    title;
    description;
    totalScore;
    timeLimitMinutes;
    shuffleQuestions;
    createdAt;
    updatedAt;
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'course_id' }),
    __metadata("design:type", String)
], Quiz.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", course_entity_1.Course)
], Quiz.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_score', type: 'decimal', precision: 10, scale: 2, default: 100 }),
    __metadata("design:type", Number)
], Quiz.prototype, "totalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_limit_minutes', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "timeLimitMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shuffle_questions', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Quiz.prototype, "shuffleQuestions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Quiz.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Quiz.prototype, "updatedAt", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)('quizzes')
], Quiz);
//# sourceMappingURL=quiz.entity.js.map