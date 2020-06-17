import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1592287552290 implements MigrationInterface {
    name = 'Init1592287552290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "event_event_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event" "event_event_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "labId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lab" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying NOT NULL, "label" character varying NOT NULL, "tel" character varying, "email" character varying, "addressZip" character varying, "addressCounty" character varying, "addressRegion" character varying, "addressCity" character varying, "addressStreet" character varying, "addressBuilding" character varying, "addressRoom" character varying, CONSTRAINT "PK_5575ab9332d71474261beb799a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" character varying NOT NULL, "labId" uuid, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_bda53ebcb0e04349b510e5cbfc0" FOREIGN KEY ("labId") REFERENCES "lab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_692631663f5904d9fc54322dc90" FOREIGN KEY ("labId") REFERENCES "lab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_692631663f5904d9fc54322dc90"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_bda53ebcb0e04349b510e5cbfc0"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "lab"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "event_event_enum"`);
    }

}
