//#endregion Local Imports
import { Planet, Weapon } from '@Entities';
//#endregion Local Imports

//#region Interface Imports
import { DamageMetaOutDto } from '@Interfaces';
//#endregion Interface Imports

export namespace CalculateMeta {
	export const Damage = async (weapon: Weapon, planet: Planet): Promise<DamageMetaOutDto> => {
		const { damage: weaponDamage } = weapon;
		const { shield } = planet;

		const damage = Math.floor(Math.random() * weaponDamage);

		const remainingShield = shield - damage;

		return { damage, remainingShield };
	};
}

