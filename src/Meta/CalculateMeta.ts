import { Planet, Weapon } from '@Entities';
import { DamageMetaOutDto } from '@Interfaces';

export namespace CalculateMeta {
	export const Damage = async (weapon: Weapon, planet: Planet): Promise<DamageMetaOutDto> => {
		const { damage: weaponDamage } = weapon;
		const { shield } = planet;

		const damage = Math.floor(Math.random() * weaponDamage)

		const remainingShield: number = shield - damage;

		return { damage, remainingShield };
	};
}
