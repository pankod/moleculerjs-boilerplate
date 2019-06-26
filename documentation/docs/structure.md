---
id: structure
title: Structure
sidebar_label: Structure
---

After the setup is complete, your app should have the following directory structure:

```sh
.
├── project-cli
├── public
│   ├── banner.png
│   ├── favicon.ico
│   └── index.html
├── services
│   ├── api.service.ts
│   ├── index.ts
│   ├── planet.service.ts
│   └── weapon.service.ts
├── src
│   ├── Helper
│   │   ├── Mocks
│   │   │   └── Context.ts
│   │   ├── PlanetHelper.ts
│   │   ├── WeaponHelper.ts
│   │   └── index.ts
│   ├── Interfaces
│   │   ├── Fire
│   │   │   ├── DamageInDto.d.ts
│   │   │   ├── FireInDto.d.ts
│   │   │   ├── FireMethodOutDto.ts
│   │   │   ├── FireOutDto.d.ts
│   │   │   ├── FireResult.d.ts
│   │   │   └── WarMessageOutDto.d.ts
│   │   ├── Planet
│   │   │   ├── DefendOutDto.d.ts
│   │   │   └── PlanetSql.d.ts
│   │   ├── Weapon
│   │   │   └── WeaponSql.d.ts
│   │   └── index.ts
│   ├── Meta
│   │   ├── CalculateMeta.ts
│   │   └── index.ts
│   ├── Models
│   │   ├── Planet.mock.ts
│   │   ├── Planet.ts
│   │   ├── Weapon.mock.ts
│   │   ├── Weapon.ts
│   │   └── index.ts
│   └── Repositories
│       ├── Database.ts
│       ├── Planet.ts
│       ├── Weapon.ts
│       └── index.ts
├── swagger
│   ├── index.js
│   ├── package.json
│   ├── swagger.json
│   └── swagger.yaml
├── swagger.json
├── swaggerConfig.json
├── test
│   ├── config
│   │   ├── Database.ts
│   │   └── mock.setup.js
│   └── unit
│       ├── Helper
│       │   ├── PlanetHelper.spec.ts
│       │   └── WeaponHelper.spec.ts
│       ├── Meta
│       │   └── CalculateMeta.spec.ts
│       ├── MicroServices
│       │   ├── planet.spec.ts
│       │   └── weapon.spec.ts
│       └── Repositories
│           ├── Planet.spec.ts
│           └── Weapon.spec.ts
├── Dockerfile
├── LICENSE
├── README.md
├── db.sqlite.example
├── docker-compose.env
├── docker-compose.yml
├── moleculer.config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
└── tsoa.json

```
