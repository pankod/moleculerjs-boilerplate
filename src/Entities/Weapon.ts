//#region Global Imports
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//#endregion Global Imports

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
