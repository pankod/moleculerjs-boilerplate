import { Planet } from '@Entities/Planet';
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';
import { CalculateMeta } from '@Meta';

export namespace PlanetRepository {
	export const Defend = async (
		damage: number,
	): Promise<{ deathStar: Weapon; alderaan: Planet }> => {
		const entityManager = getManager();

		const deathStar = await entityManager.findOne(Weapon, { name: 'Death Star' });
		const alderaan = await entityManager.findOne(Planet, { name: 'Alderaan' });

		const { remainingAmmo, remainingShield } = await CalculateMeta.Damage(
			deathStar,
			alderaan,
			damage,
		);

		deathStar.ammo = remainingAmmo;
		alderaan.shield = remainingShield;

		await entityManager.save(deathStar);
		await entityManager.save(alderaan);

		return { deathStar, alderaan };
	};
}
