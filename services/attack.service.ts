//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
//#endregion Global Imports

//#region Local Imports
import { WeaponRepository } from '@Repositories';
import { PlanetHelper } from '@Helper';
//#endregion Local Imports

//#region Interface Imports
import { IAttack } from '@Interfaces';
//#endregion Interface Imports

export class AttackService extends BaseSchema {
	public name: string = 'attack';

	@Action({
		params: {
			weaponName: { type: 'string', min: 2 },
			planetName: { type: 'string', min: 2 },
		},
	})
	public async Fire(ctx: Context<IAttack.AttackInDto>): Promise<IAttack.AttackOutDto> {
		const response = await this.FireMethod(ctx);

		return response;
	}

	@Method
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
	public async FireMethod(ctx: Context<IAttack.AttackInDto>): Promise<IAttack.AttackOutDto> {
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
}

module.exports = new AttackService();
