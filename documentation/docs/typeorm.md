---
id: typeorm
title: TypeORM & Repository
sidebar_label: TypeORM
---

`createConnection` method in  `src/Entities/Connection` file is responsible for creating database connection. 

Then, `Repositories` handles database interactions with `getManager` method of TypeORM.

Here is a planet Entity example from example app;

```
//#region Global Imports
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//#endregion Global Imports

@Entity()
export class Planet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	shield: number;
}
```

And this is Planet repository;

```
//#region Global Imports
import { getManager } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { Planet } from '@Entities/Planet';
import { getResource } from './Shared';
//#endregion Local Imports

//#region Interface Imports
import { DecreaseShieldOutDto } from '@Interfaces';
//#endregion Interface Imports

export namespace PlanetRepository {
	export const Get = async (planetName: string): Promise<Planet> => {
		return await getResource(Planet, { name: planetName });
	};

	export const DecreaseShield = async (
		planetName: string,
		remainingShield: number,
	): Promise<DecreaseShieldOutDto> => {
		const planet = await getResource(Planet, { name: planetName });

		planet.shield = remainingShield;

		await getManager().save(planet);

		return { remainingShield: planet.shield };
	};
}

```

>Refer to [offical documentation](https://typeorm.io/#/entities) for detailed usage. 

