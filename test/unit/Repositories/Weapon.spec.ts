// Global Imports
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { WeaponRepository } from '@Repositories';
import { Weapon } from '@Entities';


describe('Test WeaponRepository constructor', () => {
	it('should be defined', () => {
		expect(WeaponRepository).toBeDefined();
	});
});

describe('Weapon Repository Methods', () => {
	beforeEach(async () => {
		await setupDatabase();
	});

	afterEach(async () => {
		await getConnection().close();
	});

	it('GetWeapon', async () => {
		const weaponName = 'Death Star'

		const weapon = await WeaponRepository.Get(weaponName)

		expect(weapon.name).toEqual(weaponName)
	})

	it('Fire', async () => {
		const entityManager = getManager();

		const weaponName = 'Death Star'
		const weapon = await entityManager.findOne(Weapon, { name: weaponName });

		const expectedAmmo = weapon.ammo - 1

		const { remainingAmmo } = await WeaponRepository.Fire(weaponName);

		expect(remainingAmmo).toEqual(expectedAmmo);
	});
});
