import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "numbers" })
export class Numbers {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  value!: number;
}
