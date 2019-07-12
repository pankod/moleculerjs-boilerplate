//#region Local Imports
import PlanetSeeder from './PlanetSeeder';
import AttackSeeder from './AttackSeeder';
//#region Local Imports

const seed = async (): Promise<void> => {
	await PlanetSeeder.seed();
	await AttackSeeder.seed();
};

export default {
	seed,
};
