import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697634879368 implements MigrationInterface {
    name = 'Default1697634879368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario_termo" ("usuario_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "termo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aceito" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a5299c2464cd5ea3fcc6ac11aa" PRIMARY KEY ("usuario_id", "termo_id"))`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" ADD CONSTRAINT "FK_81d486cf67e911ff64dca7cdca5" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" ADD CONSTRAINT "FK_1680f75b90b7b356ca9b95db493" FOREIGN KEY ("termo_id") REFERENCES "termos"("termo_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_termo" DROP CONSTRAINT "FK_1680f75b90b7b356ca9b95db493"`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" DROP CONSTRAINT "FK_81d486cf67e911ff64dca7cdca5"`);
        await queryRunner.query(`DROP TABLE "usuario_termo"`);
    }

}
