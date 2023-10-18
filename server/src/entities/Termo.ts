import moment from "moment-timezone";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UsuarioTermo } from "./UsuarioTermo";

@Entity("termos")
export class Termo {
  @PrimaryGeneratedColumn("uuid")
  termo_id: string;

  @Column({ type: "text", nullable: false, unique: true })
  nomeTermo: string;

  @Column({ type: "boolean", nullable: false })
  isAtual: boolean;

  @OneToMany(() => UsuarioTermo, (ut) => ut.termo)
  usuariosAssinantes: UsuarioTermo[];

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
