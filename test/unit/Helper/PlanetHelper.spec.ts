// Local Imports
import { PlanetHelper } from '@Helper';
import { DummyContext } from '@Helper/Mocks/Context';
import {} from '@Interfaces';

describe('planet Service Helper Constructor', () => {
	it('should module exist', async () => {
		expect(PlanetHelper).toBeDefined();
	});
});

describe('planet helpers', () => {
	it('should trigger Defend method', async () => {
		const data = {
			damage: 1000,
		};

		const result = await PlanetHelper.Defend(DummyContext.getCall(data), data);

		expect(result).toBeDefined();
	});
});
