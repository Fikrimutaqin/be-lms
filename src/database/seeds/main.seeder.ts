import type { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export default class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const password = await bcrypt.hash('password123', 10);
        
        // Seed Users
        await dataSource.query(`
            INSERT INTO users (first_name, last_name, email, password, role) VALUES
            ('John', 'Instructor', 'john.instructor@lms.com', '${password}', 'instructor'),
            ('Jane', 'Student', 'jane.student@lms.com', '${password}', 'student'),
            ('Bob', 'Student', 'bob.student@lms.com', '${password}', 'student'),
            ('Admin', 'User', 'admin@lms.com', '${password}', 'admin')
            ON CONFLICT (email) DO NOTHING;
        `);

        // Seed Courses
        await dataSource.query(`
            INSERT INTO courses (instructor_id, title, description, category, duration_hours) VALUES
            ((SELECT id FROM users WHERE email = 'john.instructor@lms.com'), 'Introduction to Web Development', 'Learn the fundamentals of web development', 'Technology', 40)
            ON CONFLICT DO NOTHING;
        `);
        
        console.log('Seeding completed! 🌱');
    }
}
