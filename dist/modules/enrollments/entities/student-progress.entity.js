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
exports.StudentProgress = void 0;
const typeorm_1 = require("typeorm");
let StudentProgress = class StudentProgress {
    userId;
    courseId;
    firstName;
    lastName;
    courseTitle;
    status;
    totalSubmissions;
    gradedSubmissions;
    averageScore;
    lastGradedDate;
};
exports.StudentProgress = StudentProgress;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], StudentProgress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'course_id' }),
    __metadata("design:type", String)
], StudentProgress.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'first_name' }),
    __metadata("design:type", String)
], StudentProgress.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'last_name' }),
    __metadata("design:type", String)
], StudentProgress.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'course_title' }),
    __metadata("design:type", String)
], StudentProgress.prototype, "courseTitle", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StudentProgress.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'total_submissions' }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "totalSubmissions", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'graded_submissions' }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "gradedSubmissions", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'average_score' }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "averageScore", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'last_graded_date' }),
    __metadata("design:type", Date)
], StudentProgress.prototype, "lastGradedDate", void 0);
exports.StudentProgress = StudentProgress = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: 'student_progress',
        expression: `
    SELECT
      e.user_id,
      e.course_id,
      u.first_name,
      u.last_name,
      c.title as course_title,
      e.status,
      COUNT(DISTINCT s.id) as total_submissions,
      SUM(CASE WHEN s.status = 'graded' THEN 1 ELSE 0 END) as graded_submissions,
      AVG(g.score) as average_score,
      MAX(g.graded_at) as last_graded_date
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    LEFT JOIN submissions s ON s.user_id = e.user_id AND s.assignment_id IN (SELECT id FROM assignments WHERE course_id = c.id)
    LEFT JOIN grades g ON g.submission_id = s.id
    GROUP BY e.id, e.user_id, e.course_id, u.first_name, u.last_name, c.title, e.status
  `,
    })
], StudentProgress);
//# sourceMappingURL=student-progress.entity.js.map