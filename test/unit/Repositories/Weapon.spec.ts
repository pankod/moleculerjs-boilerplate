// Global Imports
import { getManager, getConnection } from 'typeorm'

// Local Imports
import setupDatabase from '../../config/SetupDatabase';
import { WeaponRepository } from '@Repositories';
import { Weapon } from '@Entities';

beforeEach(async () => {
	await setupDatabase()
})

afterEach(async () => {
	await getConnection().close()
})

describe('Test WeaponRepository constructor', () => {
	it('should be defined', () => {
		expect(WeaponRepository).toBeDefined();
	});
});

describe('Weapon Repository Methods', () => {
	it('should fire', async () => {
		const entityManager = getManager();

		const deathStar = await entityManager.findOne(Weapon, { name: 'Death Star' });

		const expected = deathStar.damage;

		const result = await WeaponRepository.Fire();

		expect(result.damage).toEqual(expected);
	});
})
