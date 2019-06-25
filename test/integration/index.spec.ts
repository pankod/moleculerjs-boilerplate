import { ServiceBroker, Context, ServiceSchema } from 'moleculer';
import ApiGateway = require('moleculer-web');

const fs = require("fs");
const http = require("http");
const path = require("path");
const request = require("supertest");
const express = require("express");

const setup = (serviceName) => {
	const broker = new ServiceBroker(Object.assign({}, { nodeID: undefined, logger: false }, {}));
	broker.loadService(`./test/services/${serviceName}.service`);

	const service = broker.createService(ApiGateway);
	const server = service.server;

	return [broker, service, server];
}

describe("Test Weapon service requests", () => {
	let broker;
	let service;
	let server;

	beforeAll(() => {
		[ broker, service, server] = setup('weapon');
		return broker.start();
	});

	afterAll(() => broker.stop());

	it("POST /weapon/Fire with query", () => {

        const params = {
            damage: 1000
        }

		return request(server)
			.post("/weapon/Fire")
			.query({ damage: params.damage })
			.then(res => {
				expect(res.statusCode).toBe(200);
                expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
                
				expect(res.body).toBe(`Attack with ${params.damage}!`);
			});
	});
});

describe("Test Planet service requests", () => {
	let broker;
	let service;
	let server;

	beforeAll(() => {
		[ broker, service, server] = setup('planet');
		return broker.start();
	});

	afterAll(() => broker.stop());

	it("POST /planet/Defend with query", () => {

        const params = {
            damage: 1000
        }

		return request(server)
			.post("/planet/Defend")
			.query({ damage: params.damage })
			.then(res => {
				expect(res.statusCode).toBe(200);
                expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
                
                expect(res.body).toBe(`Defend ${params.damage} attack!`);
			});
	});
});
