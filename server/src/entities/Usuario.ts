import moment from "moment-timezone";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Perfil } from "./Perfil";
import { UsuarioTermo } from "./UsuarioTermo";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  usuario_id: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @Column({ type: "boolean", nullable: false })
  permiteReceberEmailPromocoes: boolean;

  @Column({ type: "boolean", nullable: false })
  permiteReceberEmailInfos: boolean;

  @OneToOne(() => Perfil, (perfil) => perfil.usuario, {
    cascade: true,
  })
  @JoinColumn()
  perfil: Perfil;

  @OneToMany(() => UsuarioTermo, (ut) => ut.usuario)
  termosAssinados: UsuarioTermo[];

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
