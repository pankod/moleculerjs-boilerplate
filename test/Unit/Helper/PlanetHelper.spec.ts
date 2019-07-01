// Local Imports
import { PlanetHelper } from '@Helper';
import { DummyContext } from '@Test/Utils';
import { DefendInDto } from '@Interfaces';

describe('Planet service helper constructor', () => {
	it('should be defined', async () => {
		expect(PlanetHelper).toBeDefined();
	});
});

describe('Planet service helpers', () => {
	it('should trigger Defend method', async () => {
		const params: DefendInDto = {
			weaponName: 'Death Star',
			planetName: 'Alderaan',
		};

		const result = await PlanetHelper.Defend(DummyContext.getCall(params), params);

		expect(result).toBeDefined();
	});
});
