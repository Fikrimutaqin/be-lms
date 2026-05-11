import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInstructorFieldsToUsers1778430000000 implements MigrationInterface {
    name = 'AddInstructorFieldsToUsers1778430000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "rating" numeric(3,1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reviews_count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "students_count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "courses_count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "courses_count"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "students_count"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reviews_count"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "title"`);
    }

}
