import { CalculateMeta } from '@Meta';
import { WeaponSql, PlanetSql } from '@Interfaces';

import { Weapon, Planet } from '@Models';

export module WeaponRepository {
	export const Fire = async (): Promise<{ damage: number, shield: number }> => {

		const weaponModel = await Weapon.Model();
		const planetModel = await Planet.Model()

		const deathStar: any = await weaponModel.findOne({ where: { name: 'Death Star' } })
		const alderaan: any = await planetModel.findOne({ where: { name: "Alderaan" } })

		return { damage: deathStar.damage, shield: alderaan.shield }
	};
}
