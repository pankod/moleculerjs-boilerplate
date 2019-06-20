import { FireRepository } from '../../../src/Repositories/Fire';

describe('Test WeaponRepository constructor', () => {
	it('should create an empty options', () => {
		expect(FireRepository).toBeDefined();
	});

	it('should work (fire method)', async () => {
		const result = await FireRepository.Fire();
		expect(result).toEqual('ATTACK!');
	});
});
