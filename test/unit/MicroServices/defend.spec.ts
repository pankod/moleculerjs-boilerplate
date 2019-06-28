// Global Imports
import { ServiceBroker } from 'moleculer';
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '../../config/SetupDatabase';
import { PlanetHelper } from '@Helper';
import { Planet } from '@Entities/Planet';

const PlanetService = require('../../../services/planet.service');

const broker = new ServiceBroker({ logger: false });
broker.createService(PlanetService);

beforeEach(async () => {
	await setupDatabase();
	broker.start();
});

afterEach(async () => {
	await getConnection().close();
	broker.stop();
});

describe('Test Defend service', () => {
	describe('Defend method', async () => {
		it('should run defend method', async () => {
			const entityManager = getManager();
			const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

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
