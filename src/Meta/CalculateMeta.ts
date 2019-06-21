import { Planet, Weapon } from "@Repositories/Models";

import { PlanetSql } from "@Interfaces";
import { WeaponSql } from "@Interfaces";

export module CalculateMeta {
	export const Damage = async (weapon: WeaponSql, planet: PlanetSql): Promise<{ remainingAmmo: number, remainingShield: number }> => {
		const { ammo, damage } = weapon;
		const { shield } = planet;

		const remainingAmmo: number = ammo - 1;
		const remainingShield: number = shield - damage;

		return { remainingAmmo, remainingShield };
	};
}
