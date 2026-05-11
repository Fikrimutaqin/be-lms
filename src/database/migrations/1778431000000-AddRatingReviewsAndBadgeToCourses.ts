import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRatingReviewsAndBadgeToCourses1778431000000 implements MigrationInterface {
    name = 'AddRatingReviewsAndBadgeToCourses1778431000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "rating" numeric(3,1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "reviews" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "badge" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "badge"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "reviews"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "rating"`);
    }

}
