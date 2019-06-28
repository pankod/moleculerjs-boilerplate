// Local Imports
import { AttackHelper } from '@Helper';
import { DummyContext } from '@Test/Utils';
import { AttackInDto } from '@Interfaces';

describe('Weapon helper service helper constructor', () => {
	it('should be defined', async () => {
		expect(AttackHelper).toBeDefined();
	});
});

describe('Weapon service helpers', () => {
	it('should trigger Fire method', async () => {
		const params: AttackInDto = {
			weaponName: 'Death Star',
			planetName: 'Alderaan'
		};

		const result = await AttackHelper.Fire(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
