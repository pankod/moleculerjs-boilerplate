---
id: typeorm
title: Usage
sidebar_label: TypeORM
---

Entities database connection providing with `createConnection` method in  `src/Entities/Connection` file. 

After database connection repositories handles database process with `getManager` method of TypeORM.

Here is a planet Entity example from example app.


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
<br>
>Refer to [offical documentation](https://typeorm.io/#/entities) for detailed usage. 

