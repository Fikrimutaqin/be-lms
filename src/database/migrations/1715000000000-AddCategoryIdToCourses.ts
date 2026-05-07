import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryIdToCourses1715000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Tambah kolom category_id
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN category_id UUID`);

        // 2. Migrasikan data dari kolom 'category' (slug) ke 'category_id' (UUID)
        // Kita bandingkan slug kategori (LOWER) dengan kolom category yang lama
        await queryRunner.query(`
            UPDATE courses 
            SET category_id = categories.id 
            FROM categories 
            WHERE LOWER(courses.category) = LOWER(categories.slug)
        `);

        // 3. Tambah Foreign Key constraint
        await queryRunner.query(`
            ALTER TABLE courses 
            ADD CONSTRAINT FK_courses_category 
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        `);

        // 4. Hapus kolom lama 'category' dan index-nya
        await queryRunner.query(`DROP INDEX IF EXISTS idx_courses_category`);
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN category`);

        // 5. Buat index baru untuk category_id
        await queryRunner.query(`CREATE INDEX idx_courses_category_id ON courses(category_id)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse process
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN category VARCHAR(100)`);
        
        await queryRunner.query(`
            UPDATE courses 
            SET category = categories.slug 
            FROM categories 
            WHERE courses.category_id = categories.id
        `);

        await queryRunner.query(`ALTER TABLE courses DROP CONSTRAINT FK_courses_category`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_courses_category_id`);
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN category_id`);
        await queryRunner.query(`CREATE INDEX idx_courses_category ON courses(category)`);
    }
}
