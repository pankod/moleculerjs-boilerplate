// Local Imports
import { FireHelper } from '@Helper';
import { DummyContext } from '@Helper/Mocks/Context';
import { FireInDto } from '@Interfaces';

describe('fire Service Helper Constructor', () => {
	it('should module exist', async () => {
		expect(FireHelper).toBeDefined();
	});
});

describe('fire helpers', () => {
	it('should trigger fire method', async () => {
		const data: FireInDto = {
			name: 'default attack',
			damage: 1000,
			ammo: 10000
		};
		const result = await FireHelper.Fire(DummyContext.getCall(data), data);

		expect(result).toBeDefined();
	});
});
