import {MigrationInterface, QueryRunner} from "typeorm";

export class Init21591788754850 implements MigrationInterface {
    name = 'Init21591788754850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "addressCounty" TO "addressCountry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "addressCountry" TO "addressCounty"`);
    }

}
