import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1601282634274 implements MigrationInterface {
    name = 'Init1601282634274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_customer" ("id" character varying NOT NULL, CONSTRAINT "PK_7a34d01ae29f1904be9efc2dc09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lab" ("id" character varying NOT NULL, CONSTRAINT "PK_5575ab9332d71474261beb799a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "place" character varying, "actId" uuid, "datetimeDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "datetimeTime" character varying, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doc" ("id" character varying NOT NULL, "actId" uuid, CONSTRAINT "PK_10d9859fc620db615c8aa74e324" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habitan" ("id" character varying NOT NULL, CONSTRAINT "PK_a115521424350c9ee1e0ca131bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "h_type" ("id" character varying NOT NULL, CONSTRAINT "PK_8ee0d7a2e26d2cf3abf2d8e727f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_of_sample" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "habitanId" character varying, "htypeId" character varying, CONSTRAINT "PK_5027d04cf60433707607632d832" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "act_status_enum" AS ENUM('CREATED', 'REGISTERED', 'PROTOCOL', 'FULL')`);
        await queryRunner.query(`CREATE TABLE "act" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "objectName" character varying, "place" character varying, "method" character varying, "toolType" character varying, "climaticEnvironmental" character varying, "planning" character varying, "normativeDocument" text array, "sampleType" character varying, "sample" text array, "preparation" text array, "goal" character varying, "definedIndicators" text array, "additions" character varying, "informationAboutSelection" character varying, "environmentalEngineer" character varying, "representative" character varying, "passedSample" character varying, "status" "act_status_enum" NOT NULL DEFAULT 'CREATED', "isCorrect" boolean NOT NULL DEFAULT true, "customerId" character varying, "generalCustomerId" character varying, "labId" character varying, "typeOfSampleId" uuid, "datetimeDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "datetimeTime" character varying, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "act_event_event_type_enum" AS ENUM('CREATED', 'UPDATED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "act_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "act_event_event_type_enum", "event_key" character varying NOT NULL, "aggregateType" character varying NOT NULL, "aggregateid" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" uuid, CONSTRAINT "PK_384ca4eb63e17d5ab756149e27c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_ec86b8a8e82111cdc2dcd6befb5" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doc" ADD CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" ADD CONSTRAINT "FK_1fc971c088bd03cb483c1a1fea9" FOREIGN KEY ("habitanId") REFERENCES "habitan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" ADD CONSTRAINT "FK_32efd2d7e22aabd681976d8d93e" FOREIGN KEY ("htypeId") REFERENCES "h_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_4c9c6cbd088643b07b93703fed5" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_41437576f5b99a333e8651426a0" FOREIGN KEY ("generalCustomerId") REFERENCES "general_customer"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_692631663f5904d9fc54322dc90" FOREIGN KEY ("labId") REFERENCES "lab"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_eedd24746416a40dcc5bd2eabcb" FOREIGN KEY ("typeOfSampleId") REFERENCES "type_of_sample"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act_event" ADD CONSTRAINT "FK_83832050fe0904ed6174e674dae" FOREIGN KEY ("payload") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act_event" DROP CONSTRAINT "FK_83832050fe0904ed6174e674dae"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_eedd24746416a40dcc5bd2eabcb"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_692631663f5904d9fc54322dc90"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_41437576f5b99a333e8651426a0"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_4c9c6cbd088643b07b93703fed5"`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" DROP CONSTRAINT "FK_32efd2d7e22aabd681976d8d93e"`);
        await queryRunner.query(`ALTER TABLE "type_of_sample" DROP CONSTRAINT "FK_1fc971c088bd03cb483c1a1fea9"`);
        await queryRunner.query(`ALTER TABLE "doc" DROP CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_ec86b8a8e82111cdc2dcd6befb5"`);
        await queryRunner.query(`DROP TABLE "act_event"`);
        await queryRunner.query(`DROP TYPE "act_event_event_type_enum"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TYPE "act_status_enum"`);
        await queryRunner.query(`DROP TABLE "type_of_sample"`);
        await queryRunner.query(`DROP TABLE "h_type"`);
        await queryRunner.query(`DROP TABLE "habitan"`);
        await queryRunner.query(`DROP TABLE "doc"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TABLE "lab"`);
        await queryRunner.query(`DROP TABLE "general_customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
