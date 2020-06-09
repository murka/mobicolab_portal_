import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1589975808071 implements MigrationInterface {
    name = 'Init1589975808071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "doc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "ydUrl" character varying, "name" character varying, "downloadable" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "actId" character varying, CONSTRAINT "PK_10d9859fc620db615c8aa74e324" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "doc_event_event_enum" AS ENUM('DROPPED', 'UPLOADED', 'DOWNLOADED', 'DELETED', 'TITLED', 'SAVED')`, undefined);
        await queryRunner.query(`CREATE TABLE "doc_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event" "doc_event_event_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "docId" uuid, CONSTRAINT "PK_33f668b3f030a4f07b698b7c483" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "doc" ADD CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "doc_event" ADD CONSTRAINT "FK_3d4b034b8a6b5ded94fbc06c3b3" FOREIGN KEY ("docId") REFERENCES "doc"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doc_event" DROP CONSTRAINT "FK_3d4b034b8a6b5ded94fbc06c3b3"`, undefined);
        await queryRunner.query(`ALTER TABLE "doc" DROP CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6"`, undefined);
        await queryRunner.query(`DROP TABLE "doc_event"`, undefined);
        await queryRunner.query(`DROP TYPE "doc_event_event_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "doc"`, undefined);
        await queryRunner.query(`DROP TABLE "act"`, undefined);
    }

}
