import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1601371433703 implements MigrationInterface {
    name = 'Init1601371433703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "h_type_event_event_type_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "h_type_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "h_type_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_009ac69a416a6a4820b9edac5e6" PRIMARY KEY ("id", "event_key"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, "habitanId" uuid, "htypeId" uuid, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "h_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, "habitanId" uuid, CONSTRAINT "PK_8ee0d7a2e26d2cf3abf2d8e727f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habitan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, CONSTRAINT "PK_a115521424350c9ee1e0ca131bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "habitan_event_event_type_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "habitan_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "habitan_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_778c93784ca68a7ae5a19a3018a" PRIMARY KEY ("id", "event_key"))`);
        await queryRunner.query(`ALTER TABLE "h_type_event" ADD CONSTRAINT "FK_9cd649e5be5e7bd461bdcc51eea" FOREIGN KEY ("payload") REFERENCES "h_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_cdabffc56dd84bb2681c34bceaa" FOREIGN KEY ("habitanId") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_dfb88aa1efb027df8ba1447afca" FOREIGN KEY ("htypeId") REFERENCES "h_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "h_type" ADD CONSTRAINT "FK_391b39b4219f178b426ebd19ddd" FOREIGN KEY ("habitanId") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habitan_event" ADD CONSTRAINT "FK_4cbb1f6c18964e0233c7a272c7f" FOREIGN KEY ("payload") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habitan_event" DROP CONSTRAINT "FK_4cbb1f6c18964e0233c7a272c7f"`);
        await queryRunner.query(`ALTER TABLE "h_type" DROP CONSTRAINT "FK_391b39b4219f178b426ebd19ddd"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_dfb88aa1efb027df8ba1447afca"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_cdabffc56dd84bb2681c34bceaa"`);
        await queryRunner.query(`ALTER TABLE "h_type_event" DROP CONSTRAINT "FK_9cd649e5be5e7bd461bdcc51eea"`);
        await queryRunner.query(`DROP TABLE "habitan_event"`);
        await queryRunner.query(`DROP TYPE "habitan_event_event_type_enum"`);
        await queryRunner.query(`DROP TABLE "habitan"`);
        await queryRunner.query(`DROP TABLE "h_type"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "h_type_event"`);
        await queryRunner.query(`DROP TYPE "h_type_event_event_type_enum"`);
    }

}
