// Local Imports
import { PlanetHelper } from '@Helper';
import { DummyContext } from '@Helper/Mocks/Context';
import { getManager, getConnection } from 'typeorm'
import setupDatabase from '../../config/SetupDatabase';

beforeEach(async () => {
	await setupDatabase()
})

afterEach(async () => {
	await getConnection().close()
})

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
