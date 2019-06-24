import { PlanetSql, WeaponSql } from '@Interfaces';

export namespace CalculateMeta {
	export const Damage = async (
		weapon: WeaponSql,
		planet: PlanetSql,
		damage: number,
	): Promise<{ remainingAmmo: number; remainingShield: number }> => {
		const { ammo } = weapon;
		const { shield } = planet;

		const remainingAmmo: number = ammo - 1;
		const remainingShield: number = shield - damage;

		return { remainingAmmo, remainingShield };
	};
}
