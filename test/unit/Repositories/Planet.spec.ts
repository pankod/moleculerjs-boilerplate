import { PlanetRepository } from '../../../src/Repositories/Planet';
import { CalculateMeta } from '@Meta';

describe('Test PlanetRepository constructor', () => {
	it('should create an empty options', () => {
		expect(PlanetRepository).toBeDefined();
	});

	it('should work Defend method', async () => {
		const result = await PlanetRepository.Defend(1000);

		const deathStarAttack = await CalculateMeta.getDeathStarAttack();

			expect(result).toEqual(deathStarAttack.shield);
	});
});
