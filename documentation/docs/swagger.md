---
id: swagger
title: Swagger
sidebar_label: Swagger
---

swagger-jsdoc returns the validated OpenAPI specification as JSON or YAML.

moleculer-boilerplate uses swagger-jsdoc for generating swagger.json.

This code block shows swagger-jsdoc in **services/attack.service** of example app.

````
	/**
	* @swagger
	*
	*  attack/Fire:
	*    post:
	*      description: Attacks to the planet with given weapon.
	*      produces:
	*        - application/json
	*      consumes:
	*        - application/json
	*      parameters:
	*        - in: body
	*          name: params
	*          schema:
	*            type: object
	*            required:
	*              - weaponName
	*              - planetName
	*            properties:
	*              weaponName:
	*                type: string
	*                default: Death Star
	*              planetName:
	*                type: string
	*      responses:
	*        200:
	*          description: Example attack result
	*        422:
	*          description: Missing parameters
	*/
````
<br>

After running the service you will see the example API documentation on localhost:3001 which is shown at the below.

<br>
<img src="assets/swagger.png" align="center" />
<br>

>To get more information about swagger visit
 https://swagger.io/docs/specification/2-0/basic-structure/
