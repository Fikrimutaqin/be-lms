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
exports.Submission = exports.SubmissionStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const assignment_entity_1 = require("../../assignments/entities/assignment.entity");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["PENDING"] = "pending";
    SubmissionStatus["SUBMITTED"] = "submitted";
    SubmissionStatus["GRADED"] = "graded";
    SubmissionStatus["RETURNED"] = "returned";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
let Submission = class Submission {
    id;
    assignmentId;
    assignment;
    userId;
    user;
    submissionUrl;
    submissionContent;
    status;
    submittedAt;
    createdAt;
    updatedAt;
};
exports.Submission = Submission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Submission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assignment_id' }),
    __metadata("design:type", String)
], Submission.prototype, "assignmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assignment_entity_1.Assignment, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'assignment_id' }),
    __metadata("design:type", assignment_entity_1.Assignment)
], Submission.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Submission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Submission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "submissionUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_content', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "submissionContent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: SubmissionStatus.PENDING,
    }),
    __metadata("design:type", String)
], Submission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Submission.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Submission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Submission.prototype, "updatedAt", void 0);
exports.Submission = Submission = __decorate([
    (0, typeorm_1.Entity)('submissions'),
    (0, typeorm_1.Unique)(['assignmentId', 'userId'])
], Submission);
//# sourceMappingURL=submission.entity.js.map