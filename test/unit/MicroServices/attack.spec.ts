// Global Imports
import { ServiceBroker } from 'moleculer';
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '../../config/SetupDatabase';
import { AttackHelper } from '@Helper';
import { Planet } from '@Entities/Planet';

const AttackService = require('../../../services/attack.service');
const PlanetService = require('../../../services/planet.service');

const broker = new ServiceBroker({ logger: false });

broker.createService(AttackService);
broker.createService(PlanetService);

beforeEach(async () => {
	await setupDatabase();
	broker.start();
});

afterEach(async () => {
	await getConnection().close();
	broker.stop();
});

const expectedMessage = (damage: number, shield: number): string =>
	`Planet took ${damage} damage and has ${shield} shield left.`;

describe('Test attack service', () => {
	describe('Fire method', async () => {
		it('should return correct message when shield is up', async () => {
			const params = {
				planetName: 'Alderaan',
				weaponName: 'Death Star'
			};

			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toContain("Planet took");
			expect(weaponMessage).toContain("Death Star did")
		});

		it('should return different message when shield is down', async () => {
			const damage = 100000;

			const params = {
				damage,
			};

			// First fire to break shield entirely
			await AttackHelper.Fire(broker as any, params);
			const { message } = await AttackHelper.Fire(broker as any, params);

			expect(message).toEqual('Planet shield ruined! war is lost!');
		});
	});
});
