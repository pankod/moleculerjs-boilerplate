// Global Imports
import { getManager, getConnection } from 'typeorm';

// Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { AttackHelper } from '@Helper';
import { Weapon } from '@Entities';
import { BrokerHelper } from '@Test/Utils';

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

describe('Test attack service', () => {
	const params = {
		planetName: 'Alderaan',
		weaponName: 'Death Star',
	};

	describe('Fire method', async () => {
		it('when ammo is up', async () => {
			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toContain('Planet took');
			expect(weaponMessage).toContain('Death Star did');
		});

		it('when ammo is empty', async () => {
			getManager().update(Weapon, { name: 'Death Star' }, { ammo: 0 });

			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toEqual('Planet took no damage');
			expect(weaponMessage).toEqual('This weapon has no ammo');
		});
	});
});
