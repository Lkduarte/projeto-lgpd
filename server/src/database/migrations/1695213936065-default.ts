import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695213936065 implements MigrationInterface {
    name = 'Default1695213936065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("usuario_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeUsuario" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "perfilUsuarioId" uuid, CONSTRAINT "UQ_007538d8a5c491d5639681d1166" UNIQUE ("nomeUsuario"), CONSTRAINT "REL_a7289f5319c1e17844835dd777" UNIQUE ("perfilUsuarioId"), CONSTRAINT "PK_14bb5fbbada99a453c18106d039" PRIMARY KEY ("usuario_id"))`);
        await queryRunner.query(`CREATE TABLE "perfis" ("usuario_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeCompleto" text, "nomeSocial" text, "email" text, "cpf" text, "telefone" text, "endereco" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d7a949426847a17a9a3ab4857ae" UNIQUE ("email"), CONSTRAINT "UQ_dadb60e703347202124d182648a" UNIQUE ("cpf"), CONSTRAINT "UQ_4c7cf8cf789e52c09cb697aed7e" UNIQUE ("telefone"), CONSTRAINT "PK_a013fc99e8db866740ab733dd1f" PRIMARY KEY ("usuario_id"))`);
        await queryRunner.query(`CREATE TABLE "termos" ("termo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeTermo" text NOT NULL, "isAtual" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d11d723689e790c771a3e661eea" UNIQUE ("nomeTermo"), CONSTRAINT "PK_57ee15b43a2e3c6bcfe588b46af" PRIMARY KEY ("termo_id"))`);
        await queryRunner.query(`CREATE TABLE "acessos_usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enderecoIp" text NOT NULL, "data_hora" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" uuid, CONSTRAINT "PK_41b1ec5ad6cf53926e3250d310f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_a7289f5319c1e17844835dd7775" FOREIGN KEY ("perfilUsuarioId") REFERENCES "perfis"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perfis" ADD CONSTRAINT "FK_a013fc99e8db866740ab733dd1f" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "acessos_usuario" ADD CONSTRAINT "FK_eeed143f6596574bb71957460b7" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acessos_usuario" DROP CONSTRAINT "FK_eeed143f6596574bb71957460b7"`);
        await queryRunner.query(`ALTER TABLE "perfis" DROP CONSTRAINT "FK_a013fc99e8db866740ab733dd1f"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_a7289f5319c1e17844835dd7775"`);
        await queryRunner.query(`DROP TABLE "acessos_usuario"`);
        await queryRunner.query(`DROP TABLE "termos"`);
        await queryRunner.query(`DROP TABLE "perfis"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
