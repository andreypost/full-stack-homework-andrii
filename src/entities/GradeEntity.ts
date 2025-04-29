import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "grades" })
export class GradeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  class!: string;

  @Column()
  grade!: number;
}
