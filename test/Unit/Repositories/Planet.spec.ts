// Global Imports
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { PlanetRepository } from '@Repositories';
import { Planet } from '@Entities';

describe('Planet Repository Constructor', () => {
	it('should be defined', () => {
		expect(PlanetRepository).toBeDefined();
	});
});

describe('Planet Repository Methods', () => {
	beforeEach(async () => {
		await setupDatabase();
	});

	afterEach(async () => {
		await getConnection().close();
	});

	it('Defend', async () => {
		const entityManager = getManager();

		const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

		const planetName = 'Alderaan'
		const weaponName = 'Death Star'

		const { damage, remainingShield } = await PlanetRepository.Defend(weaponName, planetName);

		const expectedShield = planet.shield - damage

		expect(remainingShield).toEqual(expectedShield);
	});
});
