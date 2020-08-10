import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1597034862187 implements MigrationInterface {
    name = 'Init1597034862187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_customer" ("id" character varying NOT NULL, CONSTRAINT "PK_7a34d01ae29f1904be9efc2dc09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lab" ("id" character varying NOT NULL, CONSTRAINT "PK_5575ab9332d71474261beb799a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doc" ("id" character varying NOT NULL, "actId" uuid, CONSTRAINT "PK_10d9859fc620db615c8aa74e324" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_of_sample" ("id" character varying NOT NULL, CONSTRAINT "PK_5027d04cf60433707607632d832" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "objectName" character varying, "place" character varying, "method" character varying, "toolType" character varying, "climaticEnvironmental" character varying, "planning" character varying, "normativeDocument" text array NOT NULL, "sampleType" character varying, "sample" text array, "preparation" text array, "goal" character varying, "definedIndicators" text array, "additions" character varying, "informationAboutSelection" character varying, "environmentalEngineer" character varying, "representative" character varying, "passedSample" character varying, "status" "act_status_enum" NOT NULL DEFAULT 'CREATED', "customerId" character varying, "generalCustomerId" character varying, "labId" character varying, "typeOfSampleId" character varying, "datetimeDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "datetimeTime" character varying, "applicationPlace" character varying, "applicationDatetimeDate" TIMESTAMP WITH TIME ZONE DEFAULT now(), "applicationDatetimeTime" character varying, CONSTRAINT "PK_84c5378dc7f3b8355b6e8c3ccb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "act_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event" "act_event_event_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "actId" uuid, CONSTRAINT "PK_384ca4eb63e17d5ab756149e27c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doc" ADD CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_4c9c6cbd088643b07b93703fed5" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_41437576f5b99a333e8651426a0" FOREIGN KEY ("generalCustomerId") REFERENCES "general_customer"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_692631663f5904d9fc54322dc90" FOREIGN KEY ("labId") REFERENCES "lab"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "act" ADD CONSTRAINT "FK_eedd24746416a40dcc5bd2eabcb" FOREIGN KEY ("typeOfSampleId") REFERENCES "type_of_sample"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "act_event" ADD CONSTRAINT "FK_d3865a9d37ac0389a3679b2a966" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act_event" DROP CONSTRAINT "FK_d3865a9d37ac0389a3679b2a966"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_eedd24746416a40dcc5bd2eabcb"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_692631663f5904d9fc54322dc90"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_41437576f5b99a333e8651426a0"`);
        await queryRunner.query(`ALTER TABLE "act" DROP CONSTRAINT "FK_4c9c6cbd088643b07b93703fed5"`);
        await queryRunner.query(`ALTER TABLE "doc" DROP CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6"`);
        await queryRunner.query(`DROP TABLE "act_event"`);
        await queryRunner.query(`DROP TABLE "act"`);
        await queryRunner.query(`DROP TABLE "type_of_sample"`);
        await queryRunner.query(`DROP TABLE "doc"`);
        await queryRunner.query(`DROP TABLE "lab"`);
        await queryRunner.query(`DROP TABLE "general_customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
