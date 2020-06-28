//#region Global Imports
import ApiGateway = require('moleculer-web');
import { getConnection } from 'typeorm';
import request from 'supertest';
//#endregion Global Imports

//#region Local Imports
import setupDatabase from '@Test/Config/SetupDatabase';
import { BrokerHelper } from '@Test/Utils';
import * as supertest from 'supertest';
//#endregion Local Imports

const broker = BrokerHelper.setupBroker();
let server: Record<string, unknown>;

beforeEach(async () => {
	await setupDatabase();
});

afterEach(async () => {
	await getConnection().close();
});

beforeAll(async () => {
	const service = broker.createService(ApiGateway);
	server = service.server;
	return broker.start();
});

afterAll(async () => broker.stop());

describe('Test Attack service requests', () => {
	it('Test POST request on attack service Fire method', async () => {
		const params = {
			planetName: 'Alderaan',
			weaponName: 'Death Star',
		};

		return request(server)
			.post('/attack/Fire')
			.query({ ...params })
			.then((res: supertest.Response) => {
				expect(res.status).toBe(200);
				expect(res.header['content-type']).toBe('application/json; charset=utf-8');
				expect(res.body.planetMessage).toContain('Planet took');
				expect(res.body.weaponMessage).toContain('Death Star did');
			});
	});
});
