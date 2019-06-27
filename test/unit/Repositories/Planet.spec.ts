// Global Imports
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '../../config/SetupDatabase';
import { PlanetRepository } from '@Repositories';
import { Planet } from '@Entities';

beforeEach(async () => {
	await setupDatabase();
});

afterEach(async () => {
	await getConnection().close();
});

describe('Planet Repository Constructor', () => {
	it('should be defined', () => {
		expect(PlanetRepository).toBeDefined();
	});
});

describe('Planet Repository Methods', () => {
	it('should defend', async () => {
		const entityManager = getManager();

		const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

		const damage = 1000;

		const expected: number = planet.shield - damage;

		const params = {
			damage,
		};

		const { alderaan } = await PlanetRepository.Defend(params.damage);

		expect(alderaan.shield).toEqual(expected);
	});
});
