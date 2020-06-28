//#region Global Imports
import { Context, Service as MoleculerService } from 'moleculer';
import { Action, Method, Service } from 'moleculer-decorators';
import { getConnection } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { PlanetRepository, WeaponRepository } from '@Repositories';
import { CalculateMeta } from '@Meta';
import { Planet, Weapon } from '@Entities';
import connectionInstance from '@Entities/Connection';
//#endregion Local Imports

//#region Interface Imports
import { IPlanet } from '@Interfaces';
//#endregion Interface Imports

/**
 * @swagger
 * tags:
 *   name: Planet Service
 *   description: Planet defends an attack from a given weapon.
 */
@Service({
	name: 'planet',
})
class PlanetService extends MoleculerService {
  /**
   * @swagger
   * 
   * definitions:
   * 
   *   DefendResponseBody:
   *     in: body
   *     required:
   *       - damage
   *       - planetMessage
   *     properties:
   *       damage:
   *         type: integer
   *         example: 119
   *       planetMessage:
   *         type: string
   *         example: "Planet took 119 damage and has 86711 shield left."
   * 
   * responses:
   * 
   *   DefendResponse:
   *     description: Ok
   *     headers:
   *       content-type:
   *         description: The Content-Type entity header is used to indicate the media type of the resource.
   *         schema:
   *           type: string
   *           example: 'application/json; charset=utf-8'
   *       content-length:
   *         description: The Content-Length entity-header field indicates the size of the entity-body.
   *         schema:
   *           type: integer
   *           example: 132
   *     schema:
   *       type: object
   *       $ref: '#/definitions/DefendResponseBody'
   * 
   * paths:
	 *
	 *  /planet/Defend:
	 *    post:
	 *      description: A planet defends an attack from a given weapon.
   *      tags: [Planet Service]
	 *      produces:
	 *        - application/json
	 *      consumes:
	 *        - application/json
	 *      parameters:
	 *        - $ref: '#/parameters/AttackPlanetParams'
	 *      responses:
	 *        200:
	 *          $ref: '#/responses/DefendResponse'
	 *        404:
   *          $ref: '#/responses/EntityNotFound'
	 *        422:
   *          $ref: '#/responses/UnprocessableEntity'
	 *        5XX:
   *          $ref: '#/responses/UncaughtError'
	 */
	@Action({
		params: {
			weaponName: { type: 'string', min: 2 },
			planetName: { type: 'string', min: 2 },
		},
	})
	public async Defend(ctx: Context<IPlanet.DefendInDto>): Promise<IPlanet.DefendOutDto> {
		const response = await this.DefendMethod(ctx);

		return response;
  }

	@Method
	public async DefendMethod(ctx: Context<IPlanet.DefendInDto>): Promise<IPlanet.DefendOutDto> {
		const { planetName, weaponName } = ctx.params;

		const planet: Planet = await PlanetRepository.Get(planetName);
		const weapon: Weapon = await WeaponRepository.Get(weaponName);

		const { damage, remainingShield } = await CalculateMeta.Damage(weapon, planet);

		await PlanetRepository.DecreaseShield(planetName, remainingShield);

		let message;

		if (remainingShield > 0) {
			message = `Planet took ${damage} damage and has ${remainingShield} shield left.`;
		} else {
			message = 'Planet shield ruined! war is lost!';
		}

		return { damage, planetMessage: message };
	}

	public async started() {
		return await connectionInstance();
	}

	public async stopped() {
		return await getConnection().close();
	}
}

module.exports = PlanetService;
