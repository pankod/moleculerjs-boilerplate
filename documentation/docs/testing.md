---
id: testing
title: Testing
sidebar_label: Testing
---

This boilerplate uses [Jest](https://jestjs.io/docs/en/getting-started) for Unit Testing and [SuperTest](https://github.com/visionmedia/supertest) for integration tests.

## Seeder
We have included seeder to the project. Also we have a helper called `setupDatabase`, you can include this to `beforeEach` block of your tests.
This helper will reset database and seed the database.

Ideally, we are adding this setupDatabase helper to the `beforeEach` block. This will make sure that we run tests against freshly seeded database.

```ts
const setupDatabase = async (): Promise<void> => {
	await CreateConnection();

	await Seeder.seed();
};
```

```ts
beforeEach(async () => {
	await setupDatabase();
});
```


## Examples
### Testing Service Helpers

```js
	describe('Weapon service helpers', () => {
		it('should trigger Fire method', async () => {
			const params: IAttack.AttackInDto = {
				weaponName: 'Death Star',
				planetName: 'Alderaan',
			};

			const result = await AttackHelper.Fire(DummyContext.getCall(params), params);

			expect(result).toBeDefined();
		});
	});
```

### Testing Metas

```js
	it('should calculate remaining shield', async () => {
		const entityManager = getManager();

		const weapon = await entityManager.findOne(Weapon, { name: 'Death Star' });
		const planet = await entityManager.findOne(Planet, { name: 'Alderaan' });

		const { damage, remainingShield } = await CalculateMeta.Damage(weapon, planet);

		expect(remainingShield).toEqual(planet.shield - damage);
	});
```

### Testing Service Methods

```typescript
	const broker = BrokerHelper.setupBroker();

	beforeAll(async () => {
		await broker.start();
	});

	beforeEach(async () => {
		await setupDatabase();
	});

	afterEach(async () => {
		await getConnection().close();
	});

	afterAll(async () => {
		await broker.stop();
	});

	describe('Test attack service', () => {
		const params = {
			planetName: 'Alderaan',
			weaponName: 'Death Star',
		};

		describe('Fire method', async () => {
			it('when ammo is up', async () => {
				const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

				expect(planetMessage).toContain('Planet took');
				expect(weaponMessage).toContain('Death Star did');
			});

			it('when ammo is empty', async () => {
				getManager().update(Weapon, { name: 'Death Star' }, { ammo: 0 });

				const { planetMessage, weaponMessage } = await AttackHelper.Fire(broker as any, params);

				expect(planetMessage).toEqual('Planet took no damage');
				expect(weaponMessage).toEqual('This weapon has no ammo');
			});
		});
	});
```

### Testing Repositories

```typescript
	describe('Planet Repository Methods', () => {
		beforeEach(async () => {
			await setupDatabase();
		});

		afterEach(async () => {
			await getConnection().close();
		});

		describe('Get', () => {
			it('should get planet if there is any', async () => {
				const planetName = 'Alderaan';

				const planet = await PlanetRepository.Get(planetName);

				expect(planet.name).toEqual(planetName);
			});

			it('should raise error', async () => {
				const planetName = 'I dont exist';

				expect(() => PlanetRepository.Get(planetName)).toThrowError;
			});
		});

		it('should update shield', async () => {
			const planetName = 'Alderaan';

			const expectedShield = 1000;

			const { remainingShield } = await PlanetRepository.UpdateShield(planetName, expectedShield);

			expect(remainingShield).toEqual(expectedShield);
		});
	});
```

### Integration Tests For Services

```typescript
	const request = require("supertest");
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

	describe("Test Attack service requests", () => {
		it("Test POST request on attack service Fire method", () => {

			const params = {
				planetName: 'Alderaan',
				weaponName: 'Death Star'
			}

			return request(server)
				.post("/attack/Fire")
				.query({ ...params })
				.then(res => {
					expect(res.statusCode).toBe(200);
					expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
					expect(res.body.planetMessage).toContain('Planet took');
					expect(res.body.weaponMessage).toContain('Death Star did');
				});
		});
	});

```
