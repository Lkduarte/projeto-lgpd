import moment from "moment-timezone";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity("acessos_usuario")
export class AcessosUsuario {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuario_id, { cascade: true })
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column({ type: "text", nullable: false })
  enderecoIp: string;

  @CreateDateColumn()
  data_hora: Date;

  @BeforeInsert()
  insertCreated() {
    this.data_hora = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
  }
}
