import PlanetSeeder from './PlanetSeeder';
import AttackSeeder from './AttackSeeder';

const seed = async (): Promise<void> => {
    PlanetSeeder.seed();
    AttackSeeder.seed();
};

export default {
    seed,
};
