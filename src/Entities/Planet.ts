import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shield: number;
}