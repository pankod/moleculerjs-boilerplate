//#region Local Imports
import { AttackHelper } from '@Helper';
import { DummyContext } from '@Test/Utils';
//#endregion Local Imports

//#region Interface Imports
import { IAttack } from '@Interfaces';
//#region Interface Imports

describe('Weapon helper service helper constructor', () => {
	it('should be defined', async () => {
		expect(AttackHelper).toBeDefined();
	});
});

describe('Weapon service helpers', () => {
	it('should trigger Fire method', async () => {
		const params: IAttack.AttackInDto = {
			weaponName: 'Death Star',
			planetName: 'Alderaan',
		};

		const result = await AttackHelper.Fire(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
