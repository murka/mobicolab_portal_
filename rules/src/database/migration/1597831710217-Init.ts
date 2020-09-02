import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1597831710217 implements MigrationInterface {
    name = 'Init1597831710217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lab_type_of_sample_template_model" ("labId" character varying NOT NULL, "typeOfSampleId" character varying NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_7ea0016953f4a50acf6da20c932" PRIMARY KEY ("labId", "typeOfSampleId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lab_type_of_sample_template_model"`);
    }

}
