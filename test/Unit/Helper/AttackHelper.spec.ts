// Local Imports
import { AttackHelper } from '@Helper';
import { DummyContext } from '@Test/Utils';

describe('Weapon helper service helper constructor', () => {
	it('should be defined', async () => {
		expect(AttackHelper).toBeDefined();
	});
});

describe('Weapon service helpers', () => {
	it('should trigger Fire method', async () => {
		const params: FireInDto = {
			damage: 1000,
		};

		const result = await AttackHelper.Fire(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
