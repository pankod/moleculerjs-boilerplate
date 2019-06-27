import { PlanetSql, WeaponSql } from '@Interfaces';
import { Weapon } from '@Entities/Weapon';
import { Planet } from '@Entities/Planet';

export namespace CalculateMeta {
	export const Damage = async (
		weapon: Weapon,
		planet: Planet,
	): Promise<{ damage: number, remainingShield: number }> => {
		const { damage: weaponDamage } = weapon;
		const { shield } = planet;

		const damage = Math.floor(Math.random() * (weaponDamage * 100))

		const remainingShield: number = shield - damage;

		return { damage, remainingShield };
	};
}
