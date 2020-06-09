import {MigrationInterface, QueryRunner} from "typeorm";

export class Init41591678386879 implements MigrationInterface {
    name = 'Init41591678386879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" RENAME COLUMN "climaticsEnvironmental" TO "climaticEnvironmental"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" RENAME COLUMN "climaticEnvironmental" TO "climaticsEnvironmental"`);
    }

}
