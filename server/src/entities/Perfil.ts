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

@Entity("perfis")
export class Perfil {
  @PrimaryGeneratedColumn("uuid")
  usuario_id: string;

  @Column({ type: "text", nullable: true })
  nomeCompleto: string;

  @Column({ type: "text", nullable: true })
  nomeSocial: string;

  @Column({ type: "text", nullable: true, unique: true })
  email: string;

  @Column({ type: "text", nullable: true, unique: true })
  cpf: string;

  @Column({ type: "text", nullable: true, unique: true })
  telefone: string;

  @Column({ type: "text", nullable: true })
  endereco: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Usuario, { cascade: true })
  @JoinColumn({ name: "usuario_id", referencedColumnName: "usuario_id" })
  usuario: Usuario;

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
