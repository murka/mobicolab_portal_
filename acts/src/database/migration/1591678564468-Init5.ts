import {MigrationInterface, QueryRunner} from "typeorm";

export class Init51591678564468 implements MigrationInterface {
    name = 'Init51591678564468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" ALTER COLUMN "applicationPlace" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "act" ALTER COLUMN "applicationPlace" SET NOT NULL`);
    }

}
