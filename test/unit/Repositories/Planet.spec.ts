import { PlanetRepository } from '../../../src/Repositories/Planet';
import { Planet } from '@Entities/Planet';
import { getManager, getConnection } from 'typeorm'
import setupDatabase from '../../config/SetupDatabase';

beforeEach(async () => {
	await setupDatabase()
})

afterEach(async () => {
	await getConnection().close()
})

describe('Test PlanetRepository constructor', () => {
	it('should create an empty options', () => {
		expect(PlanetRepository).toBeDefined();
	});

	it('should work Defend method', async () => {
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
