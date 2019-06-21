import { PlanetSql } from '@Interfaces';
import { Planet, Weapon } from '@Repositories/Models';
import { CalculateMeta } from '@Meta';

export module PlanetRepository {
	export const Defend = async (damage: number): Promise<number> => {
		const weaponModel = await Weapon.Model();
		const planetModel = await Planet.Model()

		const deathStar: any = await weaponModel.findOne({ where: { name: 'Death Star' } })
		const alderaan: any = await planetModel.findOne({ where: { name: "Alderaan" } })

		const { remainingAmmo, remainingShield } = await CalculateMeta.Damage(deathStar, alderaan);

		deathStar.update({ ammo: remainingAmmo })
		alderaan.update({ shield: remainingShield })

		return remainingShield
	};
}
