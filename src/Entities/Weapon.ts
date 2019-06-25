import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  damage: number;

  @Column()
  ammo: number;
}