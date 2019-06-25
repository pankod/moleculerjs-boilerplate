import { Planet } from '@Entities/Planet'
import { Weapon } from '@Entities/Weapon'
import { getManager } from 'typeorm'

export namespace WeaponRepository {
	export const Fire = async (): Promise<{ damage: number; shield: number }> => {
		const entityManager = getManager()

		const deathStar = await entityManager.findOne(Weapon, { name: 'Death Star' })
		const alderaan = await entityManager.findOne(Planet, { name: 'Alderaan' })

		return { damage: deathStar.damage, shield: alderaan.shield };
	};
}
