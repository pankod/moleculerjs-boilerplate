import { CalculateMeta } from '../../../src/Meta/CalculateMeta';
import { Weapon } from '@Models/Weapon';
import { Planet } from '@Models/Planet';
import { WeaponSql, PlanetSql } from '@Interfaces';

describe('Test CalculateMeta constructor', () => {
	it('should create an empty options', () => {
		expect(CalculateMeta).toBeDefined();
	});
});

describe('Test CalculateMeta functions', () => {
	it('should calculate remaining shield', async () => {
		const damage: number = 1000

		const weaponModel = await Weapon.Model()
		const weapon = await weaponModel.findOne({ where: { name: "Death Star" } }) as WeaponSql

		const planetModel = await Planet.Model()
		const planet = await planetModel.findOne({ where: { name: "Alderaan" } }) as PlanetSql

		const result = await CalculateMeta.Damage(weapon, planet, damage);

		const expected = {
			remainingAmmo: weapon.ammo - 1,
			remainingShield: planet.shield - damage
		}

		expect(result).toEqual(expected);
	});
});
