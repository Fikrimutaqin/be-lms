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
exports.CourseStats = void 0;
const typeorm_1 = require("typeorm");
let CourseStats = class CourseStats {
    id;
    title;
    totalEnrolled;
    completedCount;
    activeCount;
    averageScore;
};
exports.CourseStats = CourseStats;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CourseStats.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CourseStats.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'total_enrolled' }),
    __metadata("design:type", Number)
], CourseStats.prototype, "totalEnrolled", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'completed_count' }),
    __metadata("design:type", Number)
], CourseStats.prototype, "completedCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'active_count' }),
    __metadata("design:type", Number)
], CourseStats.prototype, "activeCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'average_score' }),
    __metadata("design:type", Number)
], CourseStats.prototype, "averageScore", void 0);
exports.CourseStats = CourseStats = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: 'course_stats',
        expression: `
    SELECT
      c.id,
      c.title,
      COUNT(DISTINCT e.user_id) as total_enrolled,
      SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) as completed_count,
      SUM(CASE WHEN e.status = 'active' THEN 1 ELSE 0 END) as active_count,
      AVG(g.score) as average_score
    FROM courses c
    LEFT JOIN enrollments e ON c.id = e.course_id
    LEFT JOIN submissions s ON s.user_id = e.user_id
    LEFT JOIN grades g ON g.submission_id = s.id
    GROUP BY c.id, c.title
  `,
    })
], CourseStats);
//# sourceMappingURL=course-stats.entity.js.map