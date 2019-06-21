import { CalculateMeta } from '@Meta';
import { WeaponSql, PlanetSql } from '@Interfaces';

import { Weapon, Planet } from './Models';

export module WeaponRepository {
	export const Fire = async (): Promise<{ deathStar: WeaponSql, alderaan: PlanetSql }> => {

		const weaponModel = await Weapon.Model();
		const planetModel = await Planet.Model()

		const deathStar: any = await weaponModel.findOne({ where: { name: 'Death Star' } })
		const alderaan: any = await planetModel.findOne({ where: { name: "Alderaan" } })

		return { deathStar, alderaan }
	};
}
