import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToCourse1778422650442 implements MigrationInterface {
    name = 'AddStatusToCourse1778422650442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "status" character varying(20) NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "status"`);
    }
}
