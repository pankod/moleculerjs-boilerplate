import { CalculateMeta } from '../../../src/Meta/CalculateMeta';
import { Weapon } from '@Entities/Weapon';
import { Planet } from '@Entities/Planet';
import { getManager } from 'typeorm'
import connectionInstance from '../../config/Connection';

beforeAll(async () => {
	await connectionInstance()
})

describe('Test CalculateMeta constructor', () => {
	it('should create an empty options', () => {
		expect(CalculateMeta).toBeDefined();
	});
});

describe('Test CalculateMeta functions', () => {
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
