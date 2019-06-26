import { WeaponRepository } from '../../../src/Repositories/Weapon';
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm'
import connectionInstance from '../../config/Connection';

beforeAll(async () => {
	await connectionInstance()
})

describe('Test WeaponRepository constructor', () => {
	it('should create an empty options', () => {
		expect(WeaponRepository).toBeDefined();
	});

	it('should work (fire method)', async () => {
		const entityManager = getManager();

		const deathStar = await entityManager.findOne(Weapon, { name: 'Death Star' });

		const expected = deathStar.damage;

		const result = await WeaponRepository.Fire();

		expect(result.damage).toEqual(expected);
	});
});
