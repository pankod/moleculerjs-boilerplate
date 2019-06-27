import { WeaponRepository } from '../../../src/Repositories/Weapon';
import { Weapon } from '@Entities/Weapon';
import { getManager, getConnection } from 'typeorm'
import setupDatabase from '../../config/SetupDatabase';

beforeEach(async () => {
	await setupDatabase()
})

afterEach(async () => {
	await getConnection().close()
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
