// Global Imports
import { ServiceBroker } from 'moleculer';

// Local Imports
import { PlanetHelper } from '@Helper';
import { WeaponSql, PlanetSql } from '@Interfaces';
import { CalculateMeta } from '@Meta';
import { Planet } from '@Models/Planet';
import { Weapon } from '@Models/Weapon';

const PlanetService = require('../../../services/planet.service');

describe('Test Planet service', () => {
	const broker = new ServiceBroker({ logger: false });
	broker.createService(PlanetService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test Planet service actions', async () => {
		it('should run defend method', async () => {
			const planetModel = await Planet.Model();
			const planet = (await planetModel.findOne({
				where: { name: 'Alderaan' },
			})) as PlanetSql;

			const damage = 1000;

			const expected: number = planet.shield - damage;

			const params = {
				damage,
			};

			const { alderaan } = await PlanetHelper.Defend(broker as any, params);

			expect(alderaan.shield).toEqual(expected);
		});
	});
});
