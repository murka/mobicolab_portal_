import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1601371236561 implements MigrationInterface {
    name = 'Init1601371236561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "doc_event_event_type_enum" AS ENUM('SAVED')`);
        await queryRunner.query(`CREATE TABLE "doc_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "doc_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_33f668b3f030a4f07b698b7c483" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "doc_title_enum" AS ENUM('ACT', 'ACT_PDF', 'PROTOCOL', 'FINAL_PROTOCOL')`);
        await queryRunner.query(`CREATE TABLE "doc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" "doc_title_enum", "ydUrl" character varying, "name" character varying, "downloadable" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "actId" character varying, CONSTRAINT "PK_10d9859fc620db615c8aa74e324" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doc_event" ADD CONSTRAINT "FK_bbb2bbb7bb20f854f04ee96a830" FOREIGN KEY ("payload") REFERENCES "doc"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doc" ADD CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doc" DROP CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6"`);
        await queryRunner.query(`ALTER TABLE "doc_event" DROP CONSTRAINT "FK_bbb2bbb7bb20f854f04ee96a830"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "doc"`);
        await queryRunner.query(`DROP TYPE "doc_title_enum"`);
        await queryRunner.query(`DROP TABLE "doc_event"`);
        await queryRunner.query(`DROP TYPE "doc_event_event_type_enum"`);
    }

}
