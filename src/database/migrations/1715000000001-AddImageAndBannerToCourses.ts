import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageAndBannerToCourses1715000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN image TEXT`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN banner TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN banner`);
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN image`);
    }
}
