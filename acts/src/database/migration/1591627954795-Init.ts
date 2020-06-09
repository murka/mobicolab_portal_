import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1591627954795 implements MigrationInterface {
    name = 'Init1591627954795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.query(`CREATE TABLE "customer" ("id" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "g_customer" ("id" character varying NOT NULL, CONSTRAINT "PK_6be6e040112a298c838e99172ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lab" ("id" character varying NOT NULL, CONSTRAINT "PK_5575ab9332d71474261beb799a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "objectName" character varying NOT NULL, "place" character varying NOT NULL, "method" character varying NOT NULL, "toolType" character varying NOT NULL, "climaticsEnvironmental" character varying NOT NULL, "planning" character varying NOT NULL, "normativeDocument" text array NOT NULL, "sampleType" character varying NOT NULL, "sample" text array NOT NULL, "preparation" text array NOT NULL, "goal" character varying NOT NULL, "definedIndicators" text array NOT NULL, "additions" character varying NOT NULL, "informationAboutSelection" character varying NOT NULL, "environmentalEngineer" character varying NOT NULL, "representative" character varying NOT NULL, "passedSample" character varying NOT NULL, "customerId" character varying, "generalCustomerId" character varying, "labId" character varying, "typeOfSampleHabitan" character varying NOT NULL, "typeOfSampleTypes" character varying NOT NULL, "datetimeDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "datetimeTime" character varying, "applicationPlace" character varying NOT NULL, "applicationDatetimeDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "applicationDatetimeTime" character varying, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_4c9c6cbd088643b07b93703fed5" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_41437576f5b99a333e8651426a0" FOREIGN KEY ("generalCustomerId") REFERENCES "g_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_692631663f5904d9fc54322dc90" FOREIGN KEY ("labId") REFERENCES "lab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_692631663f5904d9fc54322dc90"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_41437576f5b99a333e8651426a0"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_4c9c6cbd088643b07b93703fed5"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "lab"`);
        await queryRunner.query(`DROP TABLE "g_customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
