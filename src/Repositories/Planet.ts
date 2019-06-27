import { Planet } from '@Entities/Planet';
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';
import { CalculateMeta } from '@Meta';
import { DefendRepoOutDto } from '@Interfaces/DefendRepoOutDto';

export namespace PlanetRepository {
	export const Defend = async (weaponName, planetName): Promise<DefendRepoOutDto> => {
		const entityManager = getManager();

		const weapon = await entityManager.findOne(Weapon, { name: weaponName });
		const planet = await entityManager.findOne(Planet, { name: planetName });

		const { remainingShield } = await CalculateMeta.Damage(
			weapon,
			planet,
		);

		planet.shield = remainingShield;

		await entityManager.save(planet);

		return { damage: weapon.damage, remainingShield };
	};
}
