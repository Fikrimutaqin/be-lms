import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialLmsSchema1714800000000 implements MigrationInterface {
    name = 'InitialLmsSchema1714800000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                avatar_url TEXT,
                role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await queryRunner.query(`CREATE INDEX idx_users_email ON users(email)`);
        await queryRunner.query(`CREATE INDEX idx_users_role ON users(role)`);

        await queryRunner.query(`
            CREATE TABLE courses (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                instructor_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                category VARCHAR(100),
                duration_hours DECIMAL(10, 2),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`CREATE INDEX idx_courses_instructor_id ON courses(instructor_id)`);
        await queryRunner.query(`CREATE INDEX idx_courses_category ON courses(category)`);

        await queryRunner.query(`
            CREATE TABLE enrollments (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                course_id UUID NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
                enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
                UNIQUE(user_id, course_id)
            )
        `);

        await queryRunner.query(`CREATE INDEX idx_enrollments_user_id ON enrollments(user_id)`);
        await queryRunner.query(`CREATE INDEX idx_enrollments_course_id ON enrollments(course_id)`);
        await queryRunner.query(`CREATE INDEX idx_enrollments_status ON enrollments(status)`);

        await queryRunner.query(`
            CREATE TABLE modules (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                course_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                sequence_order INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE lessons (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                module_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT,
                sequence_order INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
            )
        `);

        // Adding other tables similarly...
        await queryRunner.query(`
            CREATE TABLE resources (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                course_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                resource_url TEXT NOT NULL,
                resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('pdf', 'video', 'link', 'document', 'image')),
                sequence_order INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE assignments (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                course_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                due_date TIMESTAMP,
                max_score DECIMAL(10, 2) NOT NULL DEFAULT 100,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE submissions (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                assignment_id UUID NOT NULL,
                user_id UUID NOT NULL,
                submission_url TEXT,
                submission_content TEXT,
                status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded', 'returned')),
                submitted_at TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE(assignment_id, user_id)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE quizzes (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                course_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                total_score DECIMAL(10, 2) NOT NULL DEFAULT 100,
                time_limit_minutes INTEGER,
                shuffle_questions BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE quiz_questions (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                quiz_id UUID NOT NULL,
                question_text TEXT NOT NULL,
                question_type VARCHAR(50) NOT NULL CHECK (question_type IN ('multiple-choice', 'essay', 'true-false', 'short-answer')),
                points DECIMAL(10, 2) NOT NULL DEFAULT 1,
                sequence_order INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE quiz_answers (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                quiz_question_id UUID NOT NULL,
                user_id UUID NOT NULL,
                answer_text TEXT NOT NULL,
                score DECIMAL(10, 2) DEFAULT 0,
                answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (quiz_question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE grades (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                submission_id UUID,
                quiz_answer_id UUID,
                score DECIMAL(10, 2) NOT NULL,
                grade_letter VARCHAR(2) CHECK (grade_letter IN ('A', 'B', 'C', 'D', 'F')),
                feedback TEXT,
                graded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE SET NULL,
                FOREIGN KEY (quiz_answer_id) REFERENCES quiz_answers(id) ON DELETE SET NULL,
                CHECK (submission_id IS NOT NULL OR quiz_answer_id IS NOT NULL)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE discussion_forums (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                course_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE discussion_posts (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                forum_id UUID NOT NULL,
                user_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                reply_count INTEGER DEFAULT 0,
                view_count INTEGER DEFAULT 0,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (forum_id) REFERENCES discussion_forums(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE comments (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                post_id UUID NOT NULL,
                user_id UUID NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (post_id) REFERENCES discussion_posts(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE certificates (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                course_id UUID NOT NULL,
                certificate_url TEXT,
                earned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
                UNIQUE(user_id, course_id)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE notifications (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                type VARCHAR(50) NOT NULL CHECK (type IN ('assignment', 'announcement', 'grade', 'comment', 'submission', 'enrollment')),
                is_read BOOLEAN DEFAULT FALSE,
                reference_id UUID,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                read_at TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE activity_logs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                action VARCHAR(100) NOT NULL,
                entity_type VARCHAR(50) NOT NULL,
                entity_id UUID,
                changes JSONB,
                ip_address VARCHAR(45),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

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
            GROUP BY c.id, c.title
        `);

        await queryRunner.query(`
            CREATE VIEW student_progress AS
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
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP VIEW IF EXISTS student_progress`);
        await queryRunner.query(`DROP VIEW IF EXISTS course_stats`);
        await queryRunner.query(`DROP TABLE activity_logs CASCADE`);
        await queryRunner.query(`DROP TABLE notifications CASCADE`);
        await queryRunner.query(`DROP TABLE certificates CASCADE`);
        await queryRunner.query(`DROP TABLE comments CASCADE`);
        await queryRunner.query(`DROP TABLE discussion_posts CASCADE`);
        await queryRunner.query(`DROP TABLE discussion_forums CASCADE`);
        await queryRunner.query(`DROP TABLE grades CASCADE`);
        await queryRunner.query(`DROP TABLE quiz_answers CASCADE`);
        await queryRunner.query(`DROP TABLE quiz_questions CASCADE`);
        await queryRunner.query(`DROP TABLE quizzes CASCADE`);
        await queryRunner.query(`DROP TABLE submissions CASCADE`);
        await queryRunner.query(`DROP TABLE assignments CASCADE`);
        await queryRunner.query(`DROP TABLE resources CASCADE`);
        await queryRunner.query(`DROP TABLE lessons CASCADE`);
        await queryRunner.query(`DROP TABLE modules CASCADE`);
        await queryRunner.query(`DROP TABLE enrollments CASCADE`);
        await queryRunner.query(`DROP TABLE courses CASCADE`);
        await queryRunner.query(`DROP TABLE users CASCADE`);
    }
}
