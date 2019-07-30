//#region Global Imports
import { getManager, getConnection } from 'typeorm';
//#region Global Imports

//#region Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { WeaponRepository } from '@Repositories';
import { Weapon } from '@Entities';
//#endregion Local Imports

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

	describe('GetWeapon', async () => {
		it('should get weapon', async () => {
			const weaponName = 'Death Star';

			const weapon = await WeaponRepository.Get(weaponName);

			expect(weapon.name).toEqual(weaponName);
		});

		it('should throw an error if weapon not found', async () => {
			const weaponName = `I don't exist`;

			expect(async () => WeaponRepository.Get(weaponName)).toThrowError;
		});
	});

	it('Decrease Ammo', async () => {
		const entityManager = getManager();

		const weaponName = 'Death Star';
		const weapon = await entityManager.findOne(Weapon, { where: { name: weaponName } });

		const expectedAmmo = weapon.ammo - 1;

		const { remainingAmmo } = await WeaponRepository.DecreaseAmmo(weaponName);

		expect(remainingAmmo).toEqual(expectedAmmo);
	});
});
