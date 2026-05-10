import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTestimoniesTable1778425299762 implements MigrationInterface {
    name = 'CreateTestimoniesTable1778425299762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "testimonies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "course_id" uuid, "name" character varying(100) NOT NULL, "avatar" text, "content" text NOT NULL, "rating" integer NOT NULL DEFAULT '5', "status" character varying(20) NOT NULL DEFAULT 'approved', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66810cc4e65709c3bb30c5679bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "testimonies" ADD CONSTRAINT "FK_987c4eb325a18ebeda68dc39447" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "testimonies" ADD CONSTRAINT "FK_84b0f1152f1b9fb4ba5e28ec5ef" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testimonies" DROP CONSTRAINT "FK_84b0f1152f1b9fb4ba5e28ec5ef"`);
        await queryRunner.query(`ALTER TABLE "testimonies" DROP CONSTRAINT "FK_987c4eb325a18ebeda68dc39447"`);
        await queryRunner.query(`DROP TABLE "testimonies"`);
    }

}
