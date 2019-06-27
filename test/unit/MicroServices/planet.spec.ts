// Global Imports
import { ServiceBroker } from 'moleculer';

// Local Imports
import { PlanetHelper } from '@Helper';
import { Planet } from '@Entities/Planet';
import { getManager, getConnection } from 'typeorm'
import setupDatabase from '../../config/SetupDatabase';

const PlanetService = require('../../../services/planet.service');

beforeEach(async () => {
	await setupDatabase()
})

afterEach(async () => {
	await getConnection().close()
})

describe('Test Planet service', () => {
	const broker = new ServiceBroker({ logger: false });
	broker.createService(PlanetService);

	beforeEach(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test Planet service actions', async () => {
		it('should run defend method', async () => {
			const entityManager = getManager()
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
