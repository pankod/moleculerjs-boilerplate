// Local Imports
import { WeaponHelper } from '@Helper';
import { DummyContext } from '@Helper/Mocks/Context';
import { FireInDto } from '@Interfaces';

describe('Weapon Helper Service Helper Constructor', () => {
	it('should module exist', async () => {
		expect(WeaponHelper).toBeDefined();
	});
});

describe('fire helpers', () => {
	it('should trigger fire method', async () => {
		const data: FireInDto = {
			damage: 1000,
		};

		const result = await WeaponHelper.Fire(DummyContext.getCall(data), data);

		expect(result).toBeDefined();
	});
});
