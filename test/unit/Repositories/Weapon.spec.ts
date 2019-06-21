import { DeathStarRepository } from '../../../src/Repositories/DeathStar';

describe('Test WeaponRepository constructor', () => {
	it('should create an empty options', () => {
		expect(DeathStarRepository).toBeDefined();
	});

	it('should work (fire method)', async () => {
		const result = await DeathStarRepository.Fire();
		expect(result).toEqual('ATTACK!');
	});
});
