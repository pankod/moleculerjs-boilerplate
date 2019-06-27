// Global Imports
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '../../config/SetupDatabase';
import { CalculateMeta } from '@Meta';
import { Planet, Weapon } from '@Entities';

describe('CalculateMeta constructor', () => {
	it('should be defined', () => {
		expect(CalculateMeta).toBeDefined();
	});
});

describe('CalculateMeta functions', () => {
	beforeEach(async () => {
		await setupDatabase();
	});

	afterEach(async () => {
		await getConnection().close();
	});

	it('should calculate remaining shield', async () => {
		const damage: number = 1000;

		const entityManager = getManager();

		const weapon = await entityManager.findOne(Weapon, { name: 'Death Star' });
		const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

		const result = await CalculateMeta.Damage(weapon, planet, damage);

		const expected = {
			remainingAmmo: weapon.ammo - 1,
			remainingShield: planet.shield - damage,
		};

		expect(result).toEqual(expected);
	});
});
