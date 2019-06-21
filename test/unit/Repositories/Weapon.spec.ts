import { WeaponRepository } from '../../../src/Repositories/Weapon';

describe('Test WeaponRepository constructor', () => {
	it('should create an empty options', () => {
		expect(WeaponRepository).toBeDefined();
	});

	it('should work (fire method)', async () => {
		const result = await WeaponRepository.Fire();
		expect(result.damage).toEqual(1000);
	});
});
