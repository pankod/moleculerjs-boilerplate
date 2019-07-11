---
id: deployment
title: Deployment
sidebar_label: Deployment
---

## Build

Builds the app for production into the dist folder.
```sh
npm run build
```

Once you built the app, you can run microservices with;

```sh
npm run start
```

## Docker

If you want to run the app with Docker, we already included `docker-compose.yaml`, `docker-compose.env` files and scripts to start and stop Docker deployment.

To start;
```js
npm run dc:up
```

To stop;
```js
npm run dc:down
```

> We are using `NATS` for communication between microservices in Docker deployment.

*docker-compose.yaml*
```
version: "3.0"

services:

  api:
    build: .
    image: api
    env_file: docker-compose.env
    environment:
      SERVICES: api
      PORT: 3000
    ports:
      - "3000:3000"

  attack:
    build: .
    image: attack
    env_file: docker-compose.env
    environment:
      SERVICES: attack

  planet:
    build: .
    image: planet
    env_file: docker-compose.env
    environment:
      SERVICES: planet

  nats-server:
    image: nats:latest
    ports:
      - "4222:4222"

```

Refer to moleculer deployment documentation; https://moleculer.services/docs/0.13/deploying.html
