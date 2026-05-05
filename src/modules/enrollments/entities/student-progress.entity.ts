import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity({
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
export class StudentProgress {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'course_id' })
  courseId: string;

  @ViewColumn({ name: 'first_name' })
  firstName: string;

  @ViewColumn({ name: 'last_name' })
  lastName: string;

  @ViewColumn({ name: 'course_title' })
  courseTitle: string;

  @ViewColumn()
  status: string;

  @ViewColumn({ name: 'total_submissions' })
  totalSubmissions: number;

  @ViewColumn({ name: 'graded_submissions' })
  gradedSubmissions: number;

  @ViewColumn({ name: 'average_score' })
  averageScore: number;

  @ViewColumn({ name: 'last_graded_date' })
  lastGradedDate: Date;
}
