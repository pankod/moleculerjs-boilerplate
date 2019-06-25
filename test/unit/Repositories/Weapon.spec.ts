import { WeaponRepository } from '../../../src/Repositories/Weapon';
import { Weapon } from '@Models';

describe('Test WeaponRepository constructor', () => {

	it('should create an empty options', () => {
		expect(WeaponRepository).toBeDefined();
	});

	it('should work (fire method)', async () => {	
		const weaponModel = await Weapon.Model();
		const deathStar: any = await weaponModel.findOne({ where: { name: 'Death Star' } });

		const expected = deathStar.damage;

		const result = await WeaponRepository.Fire();

		expect(result.damage).toEqual(expected);
	});
});
