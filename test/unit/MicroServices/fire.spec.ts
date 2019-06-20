// Global Imports
import { ServiceBroker } from 'moleculer';

// Local Imports
import { FireHelper } from '@Helper';
import { } from '@Interfaces';

const Fire = require('../../../services/fire.service');

describe('Test Fire service', () => {

	const broker = new ServiceBroker({ logger: false });
	broker.createService(Fire);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test Fire service actions', async () => {

		it('', async () => {
			const data = {
				// params
			};

			await FireHelper.methodName(broker as any, data);
		});
	});

});
