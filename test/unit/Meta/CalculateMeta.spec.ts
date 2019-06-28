// Global Imports
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
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
		const entityManager = getManager();

		const weapon = await entityManager.findOne(Weapon, { name: 'Death Star' });
		const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

		const { damage, remainingShield } = await CalculateMeta.Damage(weapon, planet);

		expect(remainingShield).toEqual(planet.shield - damage);
	});
});
