import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "grades" })
export class Grades {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  class!: string;

  @Column()
  grade!: number;
}
