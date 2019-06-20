import { PlanetRepository } from '../../../src/Repositories/Planet';

describe('Test PlanetRepository constructor', () => {
	it('should create an empty options', () => {
		expect(PlanetRepository).toBeDefined();
	});

	it('should work (method name)', async () => {
		const result = await PlanetRepository.Defend(1000);
		expect(result).toEqual('DEFEND!');
	});
});
