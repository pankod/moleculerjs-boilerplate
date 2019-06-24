import { PlanetSql, WeaponSql } from '@Interfaces';
import { Planet } from '@Models/Planet';
import { Weapon } from '@Models/Weapon'
import { CalculateMeta } from '@Meta';

export namespace PlanetRepository {
	export const Defend = async (
		damage: number,
	): Promise<{ deathStar: WeaponSql; alderaan: PlanetSql }> => {
		const weaponModel = await Weapon.Model();
		const planetModel = await Planet.Model();

		const deathStar: any = await weaponModel.findOne({ where: { name: 'Death Star' } });
		const alderaan: any = await planetModel.findOne({ where: { name: 'Alderaan' } });

		const { remainingAmmo, remainingShield } = await CalculateMeta.Damage(
			deathStar,
			alderaan,
			damage,
		);

		deathStar.update({ ammo: remainingAmmo });
		alderaan.update({ shield: remainingShield });

		return { deathStar, alderaan };
	};
}
