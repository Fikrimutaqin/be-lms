"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseStatsView1777967020389 = void 0;
class CreateCourseStatsView1777967020389 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE VIEW course_stats AS
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
            GROUP BY c.id, c.title;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP VIEW course_stats`);
    }
}
exports.CreateCourseStatsView1777967020389 = CreateCourseStatsView1777967020389;
//# sourceMappingURL=1777967020389-CreateCourseStatsView.js.map