import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Termo } from "./Termo";
import moment from "moment-timezone";

@Entity("usuario_termo")
export class UsuarioTermo {
  @PrimaryGeneratedColumn("uuid")
  usuario_id: string;

  @PrimaryGeneratedColumn("uuid")
  termo_id: string;

  @Column({ type: "boolean", nullable: false })
  aceito: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuario_id)
  @JoinColumn({ name: "usuario_id", referencedColumnName: "usuario_id" })
  usuario: Usuario;

  @ManyToOne(() => Termo, (termo) => termo.termo_id)
  @JoinColumn({ name: "termo_id", referencedColumnName: "termo_id" })
  termo: Termo;

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
