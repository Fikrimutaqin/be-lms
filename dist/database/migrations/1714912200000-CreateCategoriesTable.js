"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoriesTable1714912200000 = void 0;
class CreateCategoriesTable1714912200000 {
    name = 'CreateCategoriesTable1714912200000';
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE categories (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL UNIQUE,
                slug VARCHAR(100) NOT NULL UNIQUE,
                description TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await queryRunner.query(`CREATE INDEX idx_categories_slug ON categories(slug)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE categories`);
    }
}
exports.CreateCategoriesTable1714912200000 = CreateCategoriesTable1714912200000;
//# sourceMappingURL=1714912200000-CreateCategoriesTable.js.map