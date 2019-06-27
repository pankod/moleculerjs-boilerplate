import { getManager } from 'typeorm';
import { Planet } from '@Entities/Planet';
import { Weapon } from '@Entities/Weapon';

const seed = async (): Promise<void> => {
	const entityManager = getManager();

	await entityManager.insert(Planet, { name: 'Alderaan', shield: 100000 });
	await entityManager.insert(Weapon, { name: 'Death Star', ammo: 1000, damage: 1000 });
};

export default {
	seed,
};
