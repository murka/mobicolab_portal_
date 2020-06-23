import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1592288397588 implements MigrationInterface {
    name = 'Init1592288397588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "event_event_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event" "event_event_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "generalCustomerId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying NOT NULL, "label" character varying NOT NULL, "tel" character varying, "email" character varying, "addressZip" character varying, "addressCountry" character varying, "addressRegion" character varying, "addressCity" character varying, "addressStreet" character varying, "addressBuilding" character varying, "addressRoom" character varying, CONSTRAINT "PK_7a34d01ae29f1904be9efc2dc09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, "generalCustomerId" uuid, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_d351569348fcc9aa6d24131413b" FOREIGN KEY ("generalCustomerId") REFERENCES "general_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_41437576f5b99a333e8651426a0" FOREIGN KEY ("generalCustomerId") REFERENCES "general_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_41437576f5b99a333e8651426a0"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_d351569348fcc9aa6d24131413b"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "general_customer"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "event_event_enum"`);
    }

}
