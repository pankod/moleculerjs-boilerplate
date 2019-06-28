import { Planet } from '@Entities/Planet';
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';
import { CalculateMeta } from '@Meta';
import { DefendRepoOutDto } from '@Interfaces';

export namespace PlanetRepository {
	export const Defend = async (weaponName: string, planetName: string): Promise<DefendRepoOutDto> => {
		const entityManager = getManager();

		const weapon = await entityManager.findOne(Weapon, { name: weaponName });
		const planet = await entityManager.findOne(Planet, { name: planetName });

		const { damage, remainingShield } = await CalculateMeta.Damage(
			weapon,
			planet,
		);

		planet.shield = remainingShield;

		await entityManager.save(planet);

		return { damage, remainingShield };
	};
}
