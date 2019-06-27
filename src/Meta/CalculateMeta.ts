import { PlanetSql, WeaponSql } from '@Interfaces';
import { Weapon } from '@Entities/Weapon';
import { Planet } from '@Entities/Planet';

export namespace CalculateMeta {
	export const Damage = async (
		weapon: Weapon,
		planet: Planet,
	): Promise<{ remainingShield: number }> => {
		const { damage } = weapon;
		const { shield } = planet;

		const remainingShield: number = shield - damage;

		return { remainingShield };
	};
}
