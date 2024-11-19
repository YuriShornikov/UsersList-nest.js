import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tests')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ default: false })
  hasproblems: boolean;
}
