// Local Imports
import { PlanetHelper } from '@Helper';
import { DummyContext } from '@Test/utils';

describe('Planet service helper constructor', () => {
	it('should be defined', async () => {
		expect(PlanetHelper).toBeDefined();
	});
});

describe('Planet service helpers', () => {
	it('should trigger Defend method', async () => {
		const params = {
			damage: 1000,
		};

		const result = await PlanetHelper.Defend(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
