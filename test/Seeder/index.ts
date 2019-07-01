import PlanetSeeder from './PlanetSeeder';
import AttackSeeder from './AttackSeeder';

const seed = async (): Promise<void> => {
	await PlanetSeeder.seed();
	await AttackSeeder.seed();
};

export default {
	seed,
};
