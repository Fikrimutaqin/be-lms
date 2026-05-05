import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToCategories1714912300000 implements MigrationInterface {
    name = 'AddImageToCategories1714912300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE categories ADD COLUMN image TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE categories DROP COLUMN image`);
    }
}
