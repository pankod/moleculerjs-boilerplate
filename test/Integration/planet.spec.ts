import ApiGateway = require('moleculer-web');
import setupDatabase from '@Test/Config/SetupDatabase';
import { getConnection } from 'typeorm';
import { BrokerHelper } from '@Test/Utils';

const request = require('supertest');
const broker = BrokerHelper.setupBroker();
let server;

beforeEach(async () => {
	await setupDatabase();
});

afterEach(async () => {
	await getConnection().close();
});

beforeAll(() => {
	const service = broker.createService(ApiGateway);
	server = service.server;
	return broker.start();
});

afterAll(() => broker.stop());

describe('Test Planet service requests', () => {
	it('Test POST request on planet service Defend method', () => {
		const params = {
			planetName: 'Alderaan',
			weaponName: 'Death Star',
		};

		return request(server)
			.post('/planet/Defend')
			.query({ ...params })
			.then(res => {
				expect(res.statusCode).toBe(200);
				expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
				expect(res.body.planetMessage).toContain('Planet took');
			});
	});
});
