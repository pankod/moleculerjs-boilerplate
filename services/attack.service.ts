//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
import { Accept, BodyOptions, Path, POST } from 'typescript-rest';
import { Produces, Tags } from 'typescript-rest-swagger';
//#endregion Global Imports

//#region Local Imports
import { WeaponRepository } from '@Repositories';
//#endregion Local Imports

//#region Interface Imports
import { DamageInDto, WarMessageOutDto, FireInDto, FireOutDto } from '@Interfaces';
import { PlanetHelper } from '@Helper';
import { FireMethodOutDto } from '@Interfaces/Fire/FireMethodOutDto';
//#endregion Interface Imports
@Path('deathstar')
@Accept('application/json; charset=utf-8')
@Produces('application/json; charset=utf-8')
@BodyOptions({ extended: true, type: 'application/json; charset=utf-8' })
@Tags('DeathStarServices')
export class AttackService extends BaseSchema {
	public name: string = 'weapon';

	@Action({
		params: {
			weaponName: 'string',
			planetName: 'string'
		},
	})
	public async Fire(ctx: Context<FireInDto>): Promise<FireOutDto> {
		const response = await this.FireMethod(ctx);

		return response;
	}

	@Method
	@POST
	public async FireMethod(ctx: Context<FireInDto>): Promise<FireOutDto> {
		const { planetName, weaponName } = ctx.params;

		const weapon = await WeaponRepository.Get(weaponName);

		if (weapon.ammo === 0) {
			return {
				planetMessage: 'Planet took no damage',
				weaponMessage: 'This weapon has no ammo',
			}
		}

		const { remainingAmmo } = await WeaponRepository.Fire(weaponName)

		const { planetMessage } = await PlanetHelper.Defend(ctx, { weaponName, planetName });

		const weaponMessage = `${weapon.name} did ${weapon.damage} damage and left ${remainingAmmo} ammo.`

		return {
			planetMessage,
			weaponMessage,
		}
	}
}

module.exports = new AttackService();
