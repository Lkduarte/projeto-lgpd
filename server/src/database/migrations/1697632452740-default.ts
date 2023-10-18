import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697632452740 implements MigrationInterface {
    name = 'Default1697632452740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "permiteReceberEmailPromocoes" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "permiteReceberEmailInfos" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "permiteReceberEmailInfos"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "permiteReceberEmailPromocoes"`);
    }

}
