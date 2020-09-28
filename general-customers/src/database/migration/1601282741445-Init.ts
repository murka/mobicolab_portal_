import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1601282741445 implements MigrationInterface {
    name = 'Init1601282741445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "gs_event_event_type_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "gs_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "gs_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_a767e352b93953003d2fc86bfcd" PRIMARY KEY ("id", "event_key"))`);
        await queryRunner.query(`CREATE TABLE "general_customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying NOT NULL, "label" character varying NOT NULL, "tel" character varying, "email" character varying, "addressZip" character varying, "addressCountry" character varying, "addressRegion" character varying, "addressCity" character varying, "addressStreet" character varying, "addressBuilding" character varying, "addressRoom" character varying, CONSTRAINT "PK_7a34d01ae29f1904be9efc2dc09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, "generalCustomerId" uuid, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gs_event" ADD CONSTRAINT "FK_f6da7fb34c9471a8ae931c3d2ef" FOREIGN KEY ("payload") REFERENCES "general_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_41437576f5b99a333e8651426a0" FOREIGN KEY ("generalCustomerId") REFERENCES "general_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_41437576f5b99a333e8651426a0"`);
        await queryRunner.query(`ALTER TABLE "gs_event" DROP CONSTRAINT "FK_f6da7fb34c9471a8ae931c3d2ef"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "general_customer"`);
        await queryRunner.query(`DROP TABLE "gs_event"`);
        await queryRunner.query(`DROP TYPE "gs_event_event_type_enum"`);
    }

}
