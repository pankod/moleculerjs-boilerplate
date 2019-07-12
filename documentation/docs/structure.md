---
id: structure
title: Structure
sidebar_label: Structure
---

After the setup is complete, your app should have the following directory structure:

```js
.
├── public
│   ├── banner.png
│   ├── favicon.ico
│   └── index.html
├── services
│   ├── api.service.ts
│   ├── attack.service.ts
│   ├── index.ts
│   └── planet.service.ts
├── src
│   ├── Entities
│   │   ├── Connection.ts
│   │   ├── Planet.ts
│   │   ├── Weapon.ts
│   │   └── index.ts
│   ├── Interfaces
│   │   ├── Meta
│   │   │   ├── DamageMetaOutDto.d.ts
│   │   │   └── index.ts
│   │   ├── Repositories
│   │   │   ├── Planet
│   │   │   │   ├── DecreaseShieldOutDto.d.ts
│   │   │   │   └── index.ts
│   │   │   └── Weapon
│   │   │       ├── DecreaseAmmoOutDto.d.ts
│   │   │       └── index.ts
│   │   ├── Services
│   │   │   ├── Attack
│   │   │   │   ├── IAttack.d.ts
│   │   │   │   └── index.ts
│   │   │   └── Planet
│   │   │       ├── IPlanet.d.ts
│   │   │       └── index.ts
│   │   └── index.ts
│   ├── Meta
│   │   ├── CalculateMeta.ts
│   │   └── index.ts
│   ├── Repositories
│   │   ├── ErrorHelpers.ts
│   │   ├── Planet.ts
│   │   ├── Shared.ts
│   │   ├── Weapon.ts
│   │   └── index.ts
│   └── ServiceHelpers
│       ├── AttackHelper.ts
│       ├── PlanetHelper.ts
│       └── index.ts
├── swagger
│   ├── config.js
│   ├── index.js
│   ├── package.json
│   └── swagger.json
├── test
│   ├── Config
│   │   ├── Connection.ts
│   │   ├── SetupDatabase.ts
│   │   └── mock.setup.ts
│   ├── Integration
│   │   ├── attack.spec.ts
│   │   └── planet.spec.ts
│   ├── Seeder
│   │   ├── AttackSeeder.ts
│   │   ├── PlanetSeeder.ts
│   │   └── index.ts
│   ├── Unit
│   │   ├── Helper
│   │   │   ├── AttackHelper.spec.ts
│   │   │   └── PlanetHelper.spec.ts
│   │   ├── Meta
│   │   │   └── CalculateMeta.spec.ts
│   │   ├── MicroServices
│   │   │   ├── attack.spec.ts
│   │   │   └── planet.spec.ts
│   │   └── Repositories
│   │       ├── ErrorHelpers.spec.ts
│   │       ├── Planet.spec.ts
│   │       └── Weapon.spec.ts
│   └── Utils
│       ├── BrokerHelper.ts
│       ├── DummyContext.ts
│       └── index.ts
├── Dockerfile
├── LICENSE
├── README.md
├── banner.png
├── cli.gif
├── db.sqlite
├── db.sqlite.example
├── docker-compose.env
├── docker-compose.yml
├── moleculer.config.ts
├── moleculerjs-cover.png
├── package-lock.json
├── package.json
├── swaggerConfig.json
├── tsconfig.json
├── tsconfig.production.json
└── tsoa.json
```
