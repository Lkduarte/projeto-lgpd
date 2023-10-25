import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Perfil } from "./Perfil";

@Entity("enderecos")
export class Endereco {
  @PrimaryGeneratedColumn("uuid")
  endereco_id: string;

  @Column()
  cep: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @OneToOne(() => Perfil, (perfil) => perfil.endereco, {
    onDelete: "CASCADE", // Quando um perfil é excluído, o endereço também será excluído
  })
  @JoinColumn({ name: "perfil_id" }) // Nome da coluna de chave estrangeira em Endereco
  perfil: Perfil;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
