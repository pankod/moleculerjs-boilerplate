//#region Global Imports
import { getManager } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { PlanetHelper } from '@ServiceHelpers';
import { Planet } from '@Entities/Planet';
import { BrokerHelper } from '@Test/Utils';
import { IPlanet } from '@Interfaces';
//#endregion Local Imports

const broker = BrokerHelper.setupBroker();

beforeEach(async () => {
	await broker.start();
	await setupDatabase();
});

afterEach(async () => {
	await broker.stop();
});

describe('Test Defend service', () => {
	describe('Defend method', () => {
		const params: IPlanet.DefendInDto = {
			planetName: 'Alderaan',
			weaponName: 'Death Star',
		};

		it('when shield is up', async () => {
			// eslint-disable-next-line
			const { planetMessage } = await PlanetHelper.Defend(broker as any, params);

			expect(planetMessage).toContain('Planet took');
		});

		it('when shield is down', async () => {
			getManager().update(Planet, { name: 'Alderaan' }, { shield: 1 });

			/* eslint-disable */
			// First fire to break shield entirely
			await PlanetHelper.Defend(broker as any, params);
			const { planetMessage } = await PlanetHelper.Defend(broker as any, params);
			/* eslint-enable */

			expect(planetMessage).toEqual('Planet shield ruined! war is lost!');
		});
	});
});
