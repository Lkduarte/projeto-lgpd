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
import { Perfil } from "./Perfil";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  usuario_id: string;

  @Column({ type: "text", nullable: false, unique: true })
  nomeUsuario: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @OneToOne(() => Perfil)
  @JoinColumn()
  perfil: Perfil;

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
