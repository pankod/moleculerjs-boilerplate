//#region Global Imports
import { getManager } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { AttackHelper } from '@ServiceHelpers';
import { Weapon } from '@Entities';
import { BrokerHelper } from '@Test/Utils';
import { IAttack } from '@Interfaces';
//#endregion Local Imports

const broker = BrokerHelper.setupBroker();

beforeEach(async () => {
	await broker.start();
	await setupDatabase();
});

afterEach(async () => {
	await broker.stop();
});

describe('Test attack service', () => {
	const params: IAttack.FireInDto = {
		planetName: 'Alderaan',
		weaponName: 'Death Star',
	};

	describe('Fire method', async () => {
		it('when ammo is up', async () => {
			// eslint-disable-next-line
			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toContain('Planet took');
			expect(weaponMessage).toContain('Death Star did');
		});

		it('when ammo is empty', async () => {
			getManager().update(Weapon, { name: 'Death Star' }, { ammo: 0 });

			// eslint-disable-next-line
			const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

			expect(planetMessage).toEqual('Planet took no damage');
			expect(weaponMessage).toEqual('This weapon has no ammo');
		});
	});
});
