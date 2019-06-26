// Global Imports
import { ServiceBroker } from 'moleculer';

// Local Imports
import { WeaponHelper } from '@Helper';
import { Planet } from '@Entities/Planet';
import { getManager } from 'typeorm'

const FireService = require('../../../services/weapon.service');
const PlanetService = require('../../../services/planet.service');

const expectedMessage = (damage: number, shield: number): string =>
	`Planet took ${damage} damage and has ${shield} shield left.`;

describe('Test weapon service', () => {
	const broker = new ServiceBroker({ logger: false });
	broker.createService(FireService);
	broker.createService(PlanetService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test Fire service actions', async () => {
		it('should return correct message when shield is up', async () => {
			const entityManager = getManager()

			const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

			const damage = 1000;

			const expectedShield = planet.shield - damage;

			const params = {
				damage,
			};

			const { message } = await WeaponHelper.Fire(broker as any, params);

			expect(message).toEqual(expectedMessage(params.damage, expectedShield));
		});
	});

	it('should return different message when shield is down', async () => {
		const damage = 100000;

		const params = {
			damage,
		};

		// First fire to break shield entirely
		await WeaponHelper.Fire(broker as any, params);
		const { message } = await WeaponHelper.Fire(broker as any, params);

		expect(message).toEqual('Planet shield ruined! war is lost!');
	});
});
