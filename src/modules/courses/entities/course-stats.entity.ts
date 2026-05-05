import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity({
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
export class CourseStats {
  @PrimaryColumn()
  id: string;

  @ViewColumn()
  title: string;

  @ViewColumn({ name: 'total_enrolled' })
  totalEnrolled: number;

  @ViewColumn({ name: 'completed_count' })
  completedCount: number;

  @ViewColumn({ name: 'active_count' })
  activeCount: number;

  @ViewColumn({ name: 'average_score' })
  averageScore: number;
}
