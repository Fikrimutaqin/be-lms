import type { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export default class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {

        // Seed Categories
        await dataSource.query(`
            INSERT INTO categories (name, slug, image, description) VALUES
            ('Technology', 'technology', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', 'Courses related to computer science, software, and hardware'),
            ('Business', 'business', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', 'Learn about entrepreneurship, management, and finance'),
            ('Design', 'design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', 'Master UI/UX, graphic design, and creative tools'),
            ('Development', 'development', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', 'Programming languages, frameworks, and architecture'),
            ('Marketing', 'marketing', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800', 'Digital marketing, SEO, and social media strategies')
            ON CONFLICT (name) DO UPDATE SET 
                image = EXCLUDED.image,
                slug = EXCLUDED.slug,
                description = EXCLUDED.description;
        `);

        const password = await bcrypt.hash('password123', 10);
        
        // Seed Users
        await dataSource.query(`
            INSERT INTO users (first_name, last_name, email, password, role, title, bio, rating, reviews_count, students_count, courses_count, avatar_url) VALUES
            ('John', 'Instructor', 'john.instructor@lms.com', '${password}', 'instructor', 'Lead Developer', 'Expert in NestJS and TypeORM with over 10 years of experience.', 4.9, 1500, 12000, 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'),
            ('Angela', 'Yu', 'angela.yu@lms.com', '${password}', 'instructor', 'Lead Instructor & Developer', 'Developer and Lead Instructor at London App Brewery. I''ve taught millions of students globally.', 4.8, 1204561, 2450000, 7, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800'),
            ('Jane', 'Student', 'jane.student@lms.com', '${password}', 'student', NULL, NULL, 0, 0, 0, 0, NULL),
            ('Bob', 'Student', 'bob.student@lms.com', '${password}', 'student', NULL, NULL, 0, 0, 0, 0, NULL),
            ('Admin', 'User', 'admin@lms.com', '${password}', 'admin', NULL, NULL, 0, 0, 0, 0, NULL)
            ON CONFLICT (email) DO NOTHING;
        `);

        // Seed Courses
        await dataSource.query(`
            INSERT INTO courses (instructor_id, title, description, category_id, image, banner, price, duration_hours) VALUES
            (
                (SELECT id FROM users WHERE email = 'john.instructor@lms.com'), 
                'Introduction to Web Development', 
                'Learn the fundamentals of web development', 
                (SELECT id FROM categories WHERE name = 'Technology' LIMIT 1), 
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
                49.99,
                40
            ),
            (
                (SELECT id FROM users WHERE email = 'john.instructor@lms.com'), 
                'Advanced NestJS Patterns', 
                'Master microservices and advanced architecture in NestJS', 
                (SELECT id FROM categories WHERE name = 'Development' LIMIT 1), 
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
                89.99,
                25.5
            ),
            (
                (SELECT id FROM users WHERE email = 'john.instructor@lms.com'), 
                'UI/UX Design Essentials', 
                'Learn to create beautiful and functional user interfaces', 
                (SELECT id FROM categories WHERE name = 'Design' LIMIT 1), 
                'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
                29.99,
                15.0
            ),
            (
                (SELECT id FROM users WHERE email = 'john.instructor@lms.com'), 
                'Fullstack TypeScript Mastery', 
                'From frontend to backend with one language', 
                (SELECT id FROM categories WHERE name = 'Development' LIMIT 1), 
                'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200',
                129.99,
                60.0
            )
            ON CONFLICT DO NOTHING;
        `);

        // Seed Enrollments
        await dataSource.query(`
            INSERT INTO enrollments (user_id, course_id, status) VALUES
            ((SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), (SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'active'),
            ((SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), (SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'active'),
            ((SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), (SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'active'),
            ((SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), (SELECT id FROM courses WHERE title = 'UI/UX Design Essentials' LIMIT 1), 'completed')
            ON CONFLICT (user_id, course_id) DO NOTHING;
        `);

        // Seed Modules
        await dataSource.query(`
            INSERT INTO modules (course_id, title, description, sequence_order) VALUES
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'Getting Started', 'Introduction to the course and web basics', 1),
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'HTML & CSS Foundations', 'Building the structure and style of websites', 2),
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'JavaScript Basics', 'Making websites interactive', 3),
            ((SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'Microservices Architecture', 'Scaling NestJS with microservices', 1),
            ((SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'CQRS and Event Sourcing', 'Advanced data patterns in NestJS', 2)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Lessons
        await dataSource.query(`
            INSERT INTO lessons (module_id, title, content, sequence_order) VALUES
            ((SELECT id FROM modules WHERE title = 'Getting Started' LIMIT 1), 'Course Overview', 'In this lesson, we will cover the goals of the course...', 1),
            ((SELECT id FROM modules WHERE title = 'Getting Started' LIMIT 1), 'Setting Up Your Environment', 'Follow these steps to install Node.js and VS Code...', 2),
            ((SELECT id FROM modules WHERE title = 'HTML & CSS Foundations' LIMIT 1), 'HTML5 Semantic Tags', 'Learn how to use header, footer, section, and article...', 1),
            ((SELECT id FROM modules WHERE title = 'HTML & CSS Foundations' LIMIT 1), 'CSS Flexbox and Grid', 'Master modern layout techniques...', 2),
            ((SELECT id FROM modules WHERE title = 'JavaScript Basics' LIMIT 1), 'Variables and Data Types', 'Understanding let, const, and basic types...', 1),
            ((SELECT id FROM modules WHERE title = 'Microservices Architecture' LIMIT 1), 'Monolith vs Microservices', 'Choosing the right architecture for your project...', 1)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Resources
        await dataSource.query(`
            INSERT INTO resources (course_id, title, resource_url, resource_type, sequence_order) VALUES
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'Course Handbook', 'https://example.com/handbook.pdf', 'pdf', 1),
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'Useful VS Code Extensions', 'https://example.com/extensions', 'link', 2),
            ((SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'Architecture Diagram', 'https://example.com/diagram.png', 'image', 1)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Assignments
        await dataSource.query(`
            INSERT INTO assignments (course_id, title, description, due_date, max_score) VALUES
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'Personal Portfolio Website', 'Build and deploy your personal portfolio using HTML and CSS.', NOW() + INTERVAL '30 days', 100),
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'JavaScript Calculator', 'Create a functional calculator using vanilla JavaScript.', NOW() + INTERVAL '15 days', 50),
            ((SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'Microservices Integration', 'Implement communication between two NestJS microservices.', NOW() + INTERVAL '20 days', 100)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Submissions
        await dataSource.query(`
            INSERT INTO submissions (assignment_id, user_id, submission_url, submission_content, status, submitted_at) VALUES
            ((SELECT id FROM assignments WHERE title = 'Personal Portfolio Website' LIMIT 1), (SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'https://github.com/jane/portfolio', 'I have deployed my portfolio to Vercel.', 'submitted', NOW()),
            ((SELECT id FROM assignments WHERE title = 'JavaScript Calculator' LIMIT 1), (SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), 'https://github.com/bob/calculator', 'Basic calculator with arithmetic operations.', 'graded', NOW() - INTERVAL '1 day')
            ON CONFLICT (assignment_id, user_id) DO NOTHING;
        `);

        // Seed Quizzes
        await dataSource.query(`
            INSERT INTO quizzes (course_id, title, description, total_score, time_limit_minutes, shuffle_questions) VALUES
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'Web Development Basics Quiz', 'Test your knowledge on HTML, CSS, and JS foundations.', 100, 30, true),
            ((SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'NestJS Architecture Quiz', 'Test your understanding of advanced NestJS patterns.', 100, 45, false)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Quiz Questions
        await dataSource.query(`
            INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, sequence_order) VALUES
            ((SELECT id FROM quizzes WHERE title = 'Web Development Basics Quiz' LIMIT 1), 'What does HTML stand for?', 'multiple-choice', 10, 1),
            ((SELECT id FROM quizzes WHERE title = 'Web Development Basics Quiz' LIMIT 1), 'Is JavaScript the same as Java?', 'true-false', 5, 2),
            ((SELECT id FROM quizzes WHERE title = 'NestJS Architecture Quiz' LIMIT 1), 'Describe the role of a Provider in NestJS.', 'essay', 20, 1)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Quiz Answers
        await dataSource.query(`
            INSERT INTO quiz_answers (quiz_question_id, user_id, answer_text, score) VALUES
            ((SELECT id FROM quiz_questions WHERE question_text = 'What does HTML stand for?' LIMIT 1), (SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'HyperText Markup Language', 10),
            ((SELECT id FROM quiz_questions WHERE question_text = 'Is JavaScript the same as Java?' LIMIT 1), (SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'No', 5)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Grades
        await dataSource.query(`
            INSERT INTO grades (user_id, submission_id, score, grade_letter, feedback) VALUES
            ((SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), (SELECT id FROM submissions WHERE submission_content LIKE '%portfolio%' LIMIT 1), 95, 'A', 'Outstanding portfolio structure and design!'),
            ((SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), (SELECT id FROM submissions WHERE submission_content LIKE '%calculator%' LIMIT 1), 85, 'B', 'Good logic, but could improve the UI.')
            ON CONFLICT DO NOTHING;
        `);

        // Seed Discussion Forums
        await dataSource.query(`
            INSERT INTO discussion_forums (course_id, title, description) VALUES
            ((SELECT id FROM courses WHERE title = 'Introduction to Web Development' LIMIT 1), 'General Discussion', 'Talk about anything related to the course.'),
            ((SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), 'Technical Support', 'Ask technical questions about NestJS.')
            ON CONFLICT DO NOTHING;
        `);

        // Seed Discussion Posts
        await dataSource.query(`
            INSERT INTO discussion_posts (forum_id, user_id, title, content) VALUES
            ((SELECT id FROM discussion_forums WHERE title = 'General Discussion' LIMIT 1), (SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'Welcome everyone!', 'Glad to be here and learning web development.'),
            ((SELECT id FROM discussion_forums WHERE title = 'Technical Support' LIMIT 1), (SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), 'Issue with Microservices', 'I am getting a timeout error when calling the auth service.')
            ON CONFLICT DO NOTHING;
        `);

        // Seed Comments
        await dataSource.query(`
            INSERT INTO comments (post_id, user_id, content) VALUES
            ((SELECT id FROM discussion_posts WHERE title = 'Welcome everyone!' LIMIT 1), (SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), 'Thanks Jane! Excited to start.'),
            ((SELECT id FROM discussion_posts WHERE title = 'Issue with Microservices' LIMIT 1), (SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'Did you check the gateway configuration?')
            ON CONFLICT DO NOTHING;
        `);

        // Manually sync reply counts for seeded data
        await dataSource.query(`
            UPDATE discussion_posts 
            SET reply_count = (SELECT COUNT(*) FROM comments WHERE comments.post_id = discussion_posts.id);
        `);

        // Seed Certificates
        await dataSource.query(`
            INSERT INTO certificates (user_id, course_id, certificate_url) VALUES
            ((SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), (SELECT id FROM courses WHERE title = 'UI/UX Design Essentials' LIMIT 1), 'https://example.com/certificates/bob-uiux.pdf')
            ON CONFLICT (user_id, course_id) DO NOTHING;
        `);

        // Seed Notifications
        await dataSource.query(`
            INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
            ((SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'Welcome to NexLearn!', 'We are glad to have you on board.', 'announcement', true),
            ((SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'New Grade Posted', 'Your portfolio has been graded.', 'grade', false),
            ((SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), 'Certificate Earned', 'Congratulations on completing UI/UX Design Essentials!', 'enrollment', false)
            ON CONFLICT DO NOTHING;
        `);

        // Seed Activity Logs
        await dataSource.query(`
            INSERT INTO activity_logs (user_id, action, entity_type, entity_id, changes, ip_address) VALUES
            ((SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), 'LOGIN', 'USER', (SELECT id FROM users WHERE email = 'jane.student@lms.com' LIMIT 1), '{"browser": "Firefox", "os": "Linux"}', '192.168.1.1'),
            ((SELECT id FROM users WHERE email = 'bob.student@lms.com' LIMIT 1), 'COURSE_ENROLL', 'COURSE', (SELECT id FROM courses WHERE title = 'Advanced NestJS Patterns' LIMIT 1), null, '127.0.0.1')
            ON CONFLICT DO NOTHING;
        `);
        
        console.log('Seeding completed! 🌱');
    }
}
