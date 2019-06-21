// Global Imports
import { ServiceBroker } from 'moleculer';

// Local Imports
import { WeaponHelper } from '@Helper';
import { } from '@Interfaces';

const Fire = require('../../../services/weapon.service');

describe('Test weapon service', () => {

	const broker = new ServiceBroker({ logger: false });
	broker.createService(Fire);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test Fire service actions', async () => {

		it('should work fire method', async () => {
			const data = {
				damage: 1000
			};

			const result = await WeaponHelper.Fire(broker as any, data);

			console.log(result);

			expect(result).toBeTruthy();
		});
	});

});
