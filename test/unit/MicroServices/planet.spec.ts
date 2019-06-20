// Global Imports
import { ServiceBroker } from 'moleculer';

// Local Imports
import { PlanetHelper } from '@Helper';
import { } from '@Interfaces';

const Planet = require('../../../services/planet.service');

describe('Test Planet service', () => {

	const broker = new ServiceBroker({ logger: false });
	broker.createService(Planet);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test Planet service actions', async () => {

		it('should run defend method', async () => {
			const data = {
				damage: 1000
			};

			await PlanetHelper.Defend(broker as any, data);
		});
	});

});
