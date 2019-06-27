// Local Imports
import { WeaponHelper } from '@Helper';
import { DummyContext } from '@Helper/Mocks/Context';
import { FireInDto } from '@Interfaces';

describe('Weapon helper service helper constructor', () => {
	it('should be defined', async () => {
		expect(WeaponHelper).toBeDefined();
	});
});

describe('Weapon service helpers', () => {
	it('should trigger Fire method', async () => {
		const params: FireInDto = {
			damage: 1000,
		};

		const result = await WeaponHelper.Fire(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
