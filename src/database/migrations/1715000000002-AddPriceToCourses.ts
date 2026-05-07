import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceToCourses1715000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN price DECIMAL(10, 2) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN price`);
    }
}
