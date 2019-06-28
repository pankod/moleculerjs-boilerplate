// Global Imports
import { ServiceBroker } from 'moleculer';
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '../../config/SetupDatabase';
import { AttackHelper } from '@Helper';
import { Planet, Weapon } from '@Entities';

const AttackService = require('../../../services/attack.service');
const PlanetService = require('../../../services/planet.service');

const broker = new ServiceBroker({ logger: false });

broker.createService(AttackService);
broker.createService(PlanetService);

beforeAll(async () => {
	await broker.start();
})

beforeEach(async () => {
	await setupDatabase();
});

afterEach(async () => {
	await getConnection().close();
});

afterAll(async () => {
	await broker.stop();
})

describe('Test attack service', () => {
	const params = {
		planetName: 'Alderaan',
		weaponName: 'Death Star'
	}

	describe('Fire method', async () => {
		it('when shield is up', async () => {
			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toContain("Planet took");
			expect(weaponMessage).toContain("Death Star did")
		});

		it('when shield is down', async () => {
			getManager().update(Planet, { name: 'Alderaan' }, { shield: 1 })

			// First fire to break shield entirely
			await AttackHelper.Fire(broker as any, params);
			const { planetMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toEqual('Planet shield ruined! war is lost!')
		});

		it('when ammo is empty', async () => {
			getManager().update(Weapon, { name: 'Death Star' }, { ammo: 0 })

			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params)

			expect(planetMessage).toEqual('Planet took no damage')
			expect(weaponMessage).toEqual('This weapon has no ammo')
		})
	});
});
