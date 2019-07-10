//#region Global Imports
import { getConnection } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { PlanetRepository } from '@Repositories';
//#endregion Local Imports

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

	describe('Get', () => {
		it('should get planet if there is any', async () => {
			const planetName = 'Alderaan';

			const planet = await PlanetRepository.Get(planetName);

			expect(planet.name).toEqual(planetName);
		});

		it('should raise error', async () => {
			const planetName = 'I dont exist';

			expect(() => PlanetRepository.Get(planetName)).toThrowError;
		});
	});

	it('should update shield', async () => {
		const planetName = 'Alderaan';

		const expectedShield = 1000;

		const { remainingShield } = await PlanetRepository.DecreaseShield(planetName, expectedShield);

		expect(remainingShield).toEqual(expectedShield);
	});
});
