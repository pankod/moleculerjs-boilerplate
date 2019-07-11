---
id: example-app
title: Example App
sidebar_label: Example App
---

We've integrated microservice example to show how services connect together. The aim of this example is to demonstrate how two different services communicate with each other.

Running `npm run setup-db` will seed the database and create a planet and a weapon. Planet's name is `Alderaan`, weapon's name is `Death Star`.
According to the story, Death Star will try to destroy Alderaan;

- **Death Star**: A weapon to destroy planets.

- **Alderaan**: A planet far far away.

TODO: Death Star is a planet destroyer weapon. It destroyed Alderaan.

## Overview

We have 2 services as seen below;

 - Attack service with **Fire Action** (**api/attack/Fire**)
	
	Death Star will use this service to attack another planet.
 
 - Planet service with **Defend Action** (**api/planet/Defend**)

	Alderaan will use this service to defend itself.

To get more information about **Actions**, visit [Moleculer Documentation](https://moleculer.services/docs/0.13/actions.html)

## Entities:

### Planet
```js
{
	name: 'Alderaan',
	shield: 100000
}
```

### Weapon
```js
{
	name: 'Death Star',
	damage: 1000,
	ammo: 1000
}
```

To get more information about `Entities`, visit [TypeOrm Documentation](https://typeorm.io/#/entities)

## Services

Both services has a structure as seen below. We can make API request to these services;

Let's fire!

### Attack Service

Attack service will get weapon and planet names as parameters. Then it will use this information to make request to Planet service to find out how much damage is done and how much shield planet has left. 
You can see example of calling a service from another service below, in **Calling a service from another service** section.

See example attack request;

```sh
POST http://localhost:3000/api/attack/Fire

Params: {
	"weaponName":"Death Star",
	"planetName": "Alderaan"
}

Response: {
    "planetMessage": "Planet took 474 damage and has 99404 shield left.",
    "weaponMessage": "Death Star did 474 damage and left 999 ammo."
}
```

Then this service will decrease ammo of the given weapon and return messages about what damage is done and how much ammo left.
You can see how we decrease the ammo of the weapon below, in **Repositories** section.

### Planet Service:

Planet service will get weapon and planet name as parameters. Then, using **CalculateMeta** helper function, will calculate how much damage will be done.
After getting the damage, service will decrease given planet's shield and return informing message about planet and how much damage is done.

```sh
POST http://localhost:3000/api/planet/Defend

Params: {
    "weaponName": "Death Star",
	"planetName": "Alderaan"
}

Response: {
    "damage": 122,
    "planetMessage": "Planet took 122 damage and has 99878 shield left."
}

```

To get more information about `Moleculer Services`, please visit [Moleculer Documentation](https://moleculer.services/docs/0.13/services.html)

## Repositories

In order to interact with the database, we are using **Repository** pattern. Every **Entity** has a corresponding **Repository**.

For example, in order to fetch **Death Star Weapon** from the database, and make it ready to fire, we should;
```
const deathStar = WeaponRepository.Get('Death Star')
```

When a weapon fires, it loses 1 ammo. We should update the database properly by using repository.

```js
const { remainingAmmo } = await WeaponRepository.DecreaseAmmo('Death Star');
```

If you want to update the shield of the planet;

```ts
const { remainingShield } = await PlanetRepository.UpdateShield('Alderaan', 5000);
```


To get more information about **Repository Pattern** please [visit here](https://deviq.com/repository-pattern/)

## Calling a service from another service

In MoleculerJS we are calling other services with a simple string parameter where service name and method separated by dot.
This is not useful. Since we don't have autocomplete, we need to remember every service and action name to call them.

```
const params = {...}

ctx.call("planet.Defend", params)
```

As the codebase goes bigger, it becomes harder and harder to remember every single service name and their actions.
To fix this, we introduced **ServiceHelpers** to call services. Every service has a helper;
```
export namespace AttackHelper {
	const prefix: string = 'attack';

	export const Fire = async (ctx: Context, params: IAttack.AttackInDto): Promise<IAttack.AttackOutDto> =>
		await ctx.call(`${prefix}.Fire`, params);
}

```

Then we can use it in other services;
```
AttackHelper.Fire(ctx, {...params})
```

If we want to call `planet` service's `Defend` action inside `Attack` service, it's straightforward;

```
const { damage, planetMessage } = await PlanetHelper.Defend(ctx, { weaponName, planetName });
```

As you can see above, it's just invoking a function and getting variables back.

## Meta

These are simple helper functions.
