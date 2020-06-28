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
//#endregion Interface Imports

@Service({
	name: 'attack',
})
class AttackService extends MoleculerService {
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
	/**
	 * @swagger
	 *
	 *  /attack/Fire:
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
	 *                example: Death Star
	 *              planetName:
	 *                type: string
	 *                example: Alderaan
	 *      responses:
	 *        200:
	 *          description: Example attack result
	 *        422:
	 *          description: Missing parameters
	 */
	public async FireMethod(ctx: Context<IAttack.FireInDto>): Promise<IAttack.FireOutDto> {
		const { planetName, weaponName } = ctx.params;

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
