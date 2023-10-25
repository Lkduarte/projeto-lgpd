import moment from "moment-timezone";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Endereco } from "./endereco";

@Entity("perfis")
export class Perfil {
  @PrimaryGeneratedColumn("uuid")
  perfil_id: string;

  @Column({ type: "text", nullable: true })
  nomeCompleto: string;

  @Column({ type: "text", nullable: true, unique: true })
  cpf: string;

  @Column({ type: "text", nullable: true, unique: true })
  telefone: string;

  @OneToOne(() => Endereco, (endereco) => endereco.perfil, {
    cascade: true, // Isto vai lidar com as operações de persistência e remoção automaticamente
  })
  @JoinColumn({ name: "perfil_id" }) // Nome da coluna de chave estrangeira em Endereco
  endereco: Endereco;

  @OneToOne(() => Usuario, (usuario) => usuario.perfil, {
    onDelete: "CASCADE", // Quando um usuário é excluído, o perfil também será excluído
  })
  @JoinColumn({ name: "usuario_id" }) // Nome da coluna de chave estrangeira em Perfil
  usuario: Usuario;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
    this.updated_at = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
  }
}
