---
id: example-app
title: Example App
sidebar_label: Example App
---

We've integrated microservice example to show how services connect together. The aim of this example is to demonstrate how two different services communicate with each other.

Running `npm run setup-db` will seed the database and create a planet and a weapon. Planet's name is `Alderaan`, weapon's name is `Death Star`.
According to the story, Death Star will try to destroy Alderaan;

- `Death Star`: A weapon to destroy planets.

- `Alderaan`: A planet far far away.

TODO: Death Star is a planet destroyer weapon. It destroyed Alderaan.

### Overview

We have 2 services as seen below;

 - Attack service with `Fire Action` (`api/attack/Fire`)
	
	Death Star will use this service to attack another planet.
 
 - Planet service with `Defend Action` (`api/planet/Defend`)

	Alderaan will use this service to defend itself.

### Entities:

#### Planet
```js
{
	name: 'Alderaan',
	shield: 100000
}
```

#### Weapon
```js
{
	name: 'Death Star',
	damage: 1000,
	ammo: 1000
}
```

### Services

Both services has a structure as seen below. We can make API request to these services;

Let's fire!

#### Attack Service

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

Under the hood, Attack service will make request to Planet service to find out how much damage is done and how much shield planet has left.

#### Planet Service:
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


### Repositories

In order to interact with the database, we are using `Repository` pattern. Every `Entity` has a corresponding `Repository`.

For example, in order to fetch `Death Star Weapon` from the database, and make it ready to fire, we should do;
```
const deathStar = WeaponRepository.Get('Death Star')
```

When `Death Star` fires, it loses 1 ammo. We should update the database properly by using repository.

```js
const { remainingAmmo } = await WeaponRepository.DecreaseAmmo(weaponName);
```

### Calling a service from another service

In MoleculerJS we are calling other services with a simple string parameter where service name and method separated by dot.
This is not useful. Since we don't have autocomplete, we need to remember every service and action name to call them.

```
const params = {...}

ctx.call("planet.Defend", params)
```

As the codebase goes bigger, it becomes harder and harder to remember every single service name and their actions.
To fix this, we introduced `Helpers` to call services. Every service has a helper;
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
