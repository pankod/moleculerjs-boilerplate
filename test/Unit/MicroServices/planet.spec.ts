//#region Global Imports
import { getManager, getConnection } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { PlanetHelper } from '@Helper';
import { Planet } from '@Entities/Planet';
import { BrokerHelper } from '@Test/Utils';
//#endregion Local Imports

const broker = BrokerHelper.setupBroker();

beforeAll(async () => {
	await broker.start();
});

beforeEach(async () => {
	await setupDatabase();
});

afterEach(async () => {
	await getConnection().close();
});

afterAll(async () => {
	await broker.stop();
});

describe('Test Defend service', () => {
	describe('Defend method', async () => {
		const params = {
			planetName: 'Alderaan',
			weaponName: 'Death Star',
		};

		it('when shield is up', async () => {
			const { planetMessage } = await PlanetHelper.Defend(broker as any, params);

			expect(planetMessage).toContain('Planet took');
		});

		it('when shield is down', async () => {
			getManager().update(Planet, { name: 'Alderaan' }, { shield: 1 });

			// First fire to break shield entirely
			await PlanetHelper.Defend(broker as any, params);
			const { planetMessage } = await PlanetHelper.Defend(broker as any, params);

			expect(planetMessage).toEqual('Planet shield ruined! war is lost!');
		});
	});
});
