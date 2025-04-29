import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "numbers" })
export class NumberEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  value!: number;
}
