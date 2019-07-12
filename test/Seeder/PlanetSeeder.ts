//#region Global Imports
import { getManager } from 'typeorm';
//#region Global Imports

//#region Local Imports
import { Planet } from '@Entities/Planet';
//#region Local Imports

const seed = async (): Promise<void> => {
	const entityManager = getManager();
	await entityManager.insert(Planet, { name: 'Alderaan', shield: 100000 });
};

export default {
	seed,
};
