import { createConnection, getManager } from 'typeorm'
import { Weapon } from '@Entities/Weapon';
import { Planet } from '@Entities/Planet';

const connectionInstance = async () => {
	await createConnection({
		type: 'sqlite',
		name: 'default',
		database: './test/db.test.sqlite',
		entities: ['./src/Entities/*.ts'],
		synchronize: true,
		dropSchema: true,
	});

	const entityManager = getManager()

	await entityManager.insert(
		Weapon,
		{ name: 'Death Star', damage: 1000, ammo: 1000 }
	)

	await entityManager.insert(
		Planet,
		{ name: 'Alderaan', shield: 100000 }
	)
}

export default connectionInstance
