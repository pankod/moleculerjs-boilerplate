---
id: example-app
title: Example App
sidebar_label: Example App
---

We've integrated microservice example to show how services connect together.

### Brief Intro
There are 2 microservices, Planet and Weapon.

We seeded database with 1 Planet and 1 Weapon;

`Death Star`: A weapon to destroy planets.

`Alderaan`: A planet far far away.

### Communication Between Services

The aim of this example is to demonstrate how two different services communicate with each other.

In order to interact with the database, we are using `Repository` pattern. Every repository has corresponding `Entity`.

Weapon service accepts `damage` parameter, then `attacks` to the `planet` service by using `Fire` action. Fire action invokes Fire method.

Let's attack!
```sh
POST http://localhost:3000/planet/defend

Params: {
    Damage: 1000
}

Response: {
    weapon: {
        id: 1,
        name: 'Death Star',
        damage: 1000,
        ammo: 999
    },
    planet: {
        id: 1,
        name: 'Alderaan',
        shield: 99000
    },
}

```

Weapon service returns a weapon object, a planet object and a message to inform about given damage and remaining shield.

```sh
POST http://localhost:3000/weapon/fire

Params: {
    damage: 1000
}

Response: {
    weapon: {
        id: 1,
        name: 'Death Star',
        damage: 1000,
        ammo: 999
    },
    planet: {
        id: 1,
        name: 'Alderaan',
        shield: 99000
    },
    message: "Planet took 1000 damage and has 99000 shield left"
}
```