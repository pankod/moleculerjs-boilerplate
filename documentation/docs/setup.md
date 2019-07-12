---
id: setup
title: Setup
---
To create a new app, you may choose one of the following methods:
#### Clone the repository:

```sh
git clone https://github.com/pankod/moleculerjs-boilerplate.git
```


#### Install the dependencies:


```sh
npm install
```

#### Setup Database (Optional):

We've integrated a microservice example to show how services connect together. We have an example database; you can copy this to play with services.

```sh
npm run setup-db
```

#### Running Microservices:

 ```sh
 npm run dev
 ```

This command will build and run services in the `services` directory. Also it will generate documentation and start swagger UI at port 3001.

#### Running with Docker

```sh
npm run dc:up
```

This should start services independently at port 3000.
