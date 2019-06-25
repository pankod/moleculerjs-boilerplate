import { PlanetRepository } from '../../../src/Repositories/Planet';
import { Planet } from '@Models/Planet';
import { PlanetSql } from '@Interfaces';

describe('Test PlanetRepository constructor', () => {
	it('should create an empty options', () => {
		expect(PlanetRepository).toBeDefined();
	});

	it('should work Defend method', async () => {
		const planetModel = await Planet.Model();
		const planet = (await planetModel.findOne({ where: { name: 'Alderaan' } })) as PlanetSql;

		const damage = 1000;

		const expected: number = planet.shield - damage;

		const params = {
			damage,
		};

		const { alderaan } = await PlanetRepository.Defend(params.damage);

		expect(alderaan.shield).toEqual(expected);
	});
});
