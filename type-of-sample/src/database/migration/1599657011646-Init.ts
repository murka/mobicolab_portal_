import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1599657011646 implements MigrationInterface {
    name = 'Init1599657011646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "h_type_event_event_type_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "h_type_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "h_type_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_009ac69a416a6a4820b9edac5e6" PRIMARY KEY ("id", "event_key"))`);
        await queryRunner.query(`CREATE TABLE "habitan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, CONSTRAINT "PK_a115521424350c9ee1e0ca131bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habitans_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, "habitanId" uuid, CONSTRAINT "PK_c16bffd20ffddfa59a595cfde6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_of_sample" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "habitanId" uuid, "htypeId" uuid, CONSTRAINT "PK_5027d04cf60433707607632d832" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, "typeOfSampleId" uuid, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "h_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, "habitanId" uuid, CONSTRAINT "PK_8ee0d7a2e26d2cf3abf2d8e727f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "habitan_event_event_type_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "habitan_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "habitan_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_778c93784ca68a7ae5a19a3018a" PRIMARY KEY ("id", "event_key"))`);
        await queryRunner.query(`ALTER TABLE "h_type_event" ADD CONSTRAINT "FK_9cd649e5be5e7bd461bdcc51eea" FOREIGN KEY ("payload") REFERENCES "h_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habitans_type" ADD CONSTRAINT "FK_5b8fbe004c7b98f824bf84e2ede" FOREIGN KEY ("habitanId") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" ADD CONSTRAINT "FK_1fc971c088bd03cb483c1a1fea9" FOREIGN KEY ("habitanId") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" ADD CONSTRAINT "FK_32efd2d7e22aabd681976d8d93e" FOREIGN KEY ("htypeId") REFERENCES "habitans_type"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_eedd24746416a40dcc5bd2eabcb" FOREIGN KEY ("typeOfSampleId") REFERENCES "type_of_sample"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "h_type" ADD CONSTRAINT "FK_391b39b4219f178b426ebd19ddd" FOREIGN KEY ("habitanId") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habitan_event" ADD CONSTRAINT "FK_4cbb1f6c18964e0233c7a272c7f" FOREIGN KEY ("payload") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habitan_event" DROP CONSTRAINT "FK_4cbb1f6c18964e0233c7a272c7f"`);
        await queryRunner.query(`ALTER TABLE "h_type" DROP CONSTRAINT "FK_391b39b4219f178b426ebd19ddd"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_eedd24746416a40dcc5bd2eabcb"`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" DROP CONSTRAINT "FK_32efd2d7e22aabd681976d8d93e"`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" DROP CONSTRAINT "FK_1fc971c088bd03cb483c1a1fea9"`);
        await queryRunner.query(`ALTER TABLE "habitans_type" DROP CONSTRAINT "FK_5b8fbe004c7b98f824bf84e2ede"`);
        await queryRunner.query(`ALTER TABLE "h_type_event" DROP CONSTRAINT "FK_9cd649e5be5e7bd461bdcc51eea"`);
        await queryRunner.query(`DROP TABLE "habitan_event"`);
        await queryRunner.query(`DROP TYPE "habitan_event_event_type_enum"`);
        await queryRunner.query(`DROP TABLE "h_type"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "type_of_sample"`);
        await queryRunner.query(`DROP TABLE "habitans_type"`);
        await queryRunner.query(`DROP TABLE "habitan"`);
        await queryRunner.query(`DROP TABLE "h_type_event"`);
        await queryRunner.query(`DROP TYPE "h_type_event_event_type_enum"`);
    }

}
