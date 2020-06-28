//#region Global Imports
import { Context, Service as MoleculerService } from 'moleculer';
import { Action, Method, Service } from 'moleculer-decorators';
import { getConnection } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { WeaponRepository } from '@Repositories';
import { PlanetHelper } from '@ServiceHelpers';
import connectionInstance from '@Entities/Connection';
//#endregion Local Imports

//#region Interface Imports
import { IAttack } from '@Interfaces';
import { exit } from 'process';
//#endregion Interface Imports

/**
 * @swagger
 * tags:
 *   name: Attack Service
 *   description: Attacks to the planet with given weapon.
 */
@Service({
	name: 'attack',
})
class AttackService extends MoleculerService {
  /**
   * @swagger
   * definitions:
   * 
   *   AttackResponseBody:
   *     in: body
   *     required:
   *       - planetMessage
   *       - weaponMessage
   *     properties:
   *       planetMessage:
   *         type: string
   *         example: 'Planet took 233 damage and has 87552 shield left.'
   *       weaponMessage:
   *         type: string
   *         example: 'Death Star did 89 damage and left 986 ammo.'
   * 
   * responses:
   * 
   *   AttackResponse:
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
   *       $ref: '#/definitions/AttackResponseBody'
   * 
	 * paths:
   * 
	 *  /attack/Fire:
	 *    post:
	 *      description: Attacks to the planet with given weapon.
   *      tags: [Attack Service]
	 *      produces:
	 *        - application/json
	 *      consumes:
	 *        - application/json
	 *      parameters:
   *        - $ref: '#/parameters/AttackPlanetParams'
	 *      responses:
	 *        200:
	 *          $ref: '#/responses/AttackResponse'
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
	public async Fire(ctx: Context<IAttack.FireInDto>): Promise<IAttack.FireOutDto> {
		const response = await this.FireMethod(ctx);

		return response;
  }

	@Method
	public async FireMethod(ctx: Context<IAttack.FireInDto>): Promise<IAttack.FireOutDto> {
    const { planetName, weaponName } = ctx.params;
    
    throw new Error();

		const weapon = await WeaponRepository.Get(weaponName);

		if (weapon.ammo <= 0) {
			return {
				planetMessage: 'Planet took no damage',
				weaponMessage: 'This weapon has no ammo',
			};
		}

		const { remainingAmmo } = await WeaponRepository.DecreaseAmmo(weaponName);

		const { damage, planetMessage } = await PlanetHelper.Defend(ctx, {
			weaponName,
			planetName,
		});

		const weaponMessage = `${weapon.name} did ${damage} damage and left ${remainingAmmo} ammo.`;

		return {
			planetMessage,
			weaponMessage,
		};
	}

	public async started() {
		return await connectionInstance();
	}

	public async stopped() {
		return await getConnection().close();
	}
}

module.exports = AttackService;
