import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698235608651 implements MigrationInterface {
    name = 'Default1698235608651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "termos" ("termo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeTermo" text NOT NULL, "isAtual" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d11d723689e790c771a3e661eea" UNIQUE ("nomeTermo"), CONSTRAINT "PK_57ee15b43a2e3c6bcfe588b46af" PRIMARY KEY ("termo_id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_termo" ("usuario_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "termo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aceito" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a5299c2464cd5ea3fcc6ac11aa" PRIMARY KEY ("usuario_id", "termo_id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("usuario_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "permiteReceberEmailPromocoes" boolean NOT NULL, "permiteReceberEmailInfos" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "perfilPerfilId" uuid, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "REL_4747bbe261068906c7b663d53b" UNIQUE ("perfilPerfilId"), CONSTRAINT "PK_14bb5fbbada99a453c18106d039" PRIMARY KEY ("usuario_id"))`);
        await queryRunner.query(`CREATE TABLE "enderecos" ("endereco_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying NOT NULL, "rua" character varying NOT NULL, "numero" character varying NOT NULL, "complemento" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "perfil_id" uuid, CONSTRAINT "REL_05eaeb99f3eae748499ecb280d" UNIQUE ("perfil_id"), CONSTRAINT "PK_b4bdf394256b0fe3f97dec2ba0d" PRIMARY KEY ("endereco_id"))`);
        await queryRunner.query(`CREATE TABLE "perfis" ("perfil_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeCompleto" text, "cpf" text, "telefone" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" uuid, CONSTRAINT "UQ_dadb60e703347202124d182648a" UNIQUE ("cpf"), CONSTRAINT "UQ_4c7cf8cf789e52c09cb697aed7e" UNIQUE ("telefone"), CONSTRAINT "REL_a013fc99e8db866740ab733dd1" UNIQUE ("usuario_id"), CONSTRAINT "PK_8f055973b9351d3409f39eb14a4" PRIMARY KEY ("perfil_id"))`);
        await queryRunner.query(`CREATE TABLE "acessos_usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enderecoIp" text NOT NULL, "data_hora" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" uuid, CONSTRAINT "PK_41b1ec5ad6cf53926e3250d310f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" ADD CONSTRAINT "FK_81d486cf67e911ff64dca7cdca5" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" ADD CONSTRAINT "FK_1680f75b90b7b356ca9b95db493" FOREIGN KEY ("termo_id") REFERENCES "termos"("termo_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_4747bbe261068906c7b663d53b1" FOREIGN KEY ("perfilPerfilId") REFERENCES "perfis"("perfil_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD CONSTRAINT "FK_05eaeb99f3eae748499ecb280d0" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("perfil_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perfis" ADD CONSTRAINT "FK_8f055973b9351d3409f39eb14a4" FOREIGN KEY ("perfil_id") REFERENCES "enderecos"("endereco_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perfis" ADD CONSTRAINT "FK_a013fc99e8db866740ab733dd1f" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "acessos_usuario" ADD CONSTRAINT "FK_eeed143f6596574bb71957460b7" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acessos_usuario" DROP CONSTRAINT "FK_eeed143f6596574bb71957460b7"`);
        await queryRunner.query(`ALTER TABLE "perfis" DROP CONSTRAINT "FK_a013fc99e8db866740ab733dd1f"`);
        await queryRunner.query(`ALTER TABLE "perfis" DROP CONSTRAINT "FK_8f055973b9351d3409f39eb14a4"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP CONSTRAINT "FK_05eaeb99f3eae748499ecb280d0"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_4747bbe261068906c7b663d53b1"`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" DROP CONSTRAINT "FK_1680f75b90b7b356ca9b95db493"`);
        await queryRunner.query(`ALTER TABLE "usuario_termo" DROP CONSTRAINT "FK_81d486cf67e911ff64dca7cdca5"`);
        await queryRunner.query(`DROP TABLE "acessos_usuario"`);
        await queryRunner.query(`DROP TABLE "perfis"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuario_termo"`);
        await queryRunner.query(`DROP TABLE "termos"`);
    }

}
