import { getManager } from 'typeorm';
import { Planet } from '@Entities/Planet';

const seed = async (): Promise<void> => {
	const entityManager = getManager();
	await entityManager.insert(Planet, { name: 'Alderaan', shield: 100000 });
};

export default { 
	seed
};