import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1592902857778 implements MigrationInterface {
    name = 'Init1592902857778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doc" DROP CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6"`, undefined);
        await queryRunner.query(`ALTER TABLE "doc" DROP COLUMN "actId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doc" ADD "actId" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "doc" ADD CONSTRAINT "FK_a7d1bdb2f7ceb7bb0b7bec37ce6" FOREIGN KEY ("actId") REFERENCES "act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
