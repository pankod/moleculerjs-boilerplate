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
import { AttackInDto, AttackOutDto } from '@Interfaces';
import { PlanetHelper } from '@Helper';
//#endregion Interface Imports

@Path('attack')
@Accept('application/json; charset=utf-8')
@Produces('application/json; charset=utf-8')
@BodyOptions({ extended: true, type: 'application/json; charset=utf-8' })
@Tags('AttackServices')

export class AttackService extends BaseSchema {
	public name: string = 'attack';

	@Action({
		params: {
			weaponName: { type: 'string', min: 2 },
			planetName: { type: 'string', min: 2 }
		},
	})
	public async Fire(ctx: Context<AttackInDto>): Promise<AttackOutDto> {
		const response = await this.FireMethod(ctx);

		return response;
	}

	@Method
	@POST
	public async FireMethod(ctx: Context<AttackInDto>): Promise<AttackOutDto> {
		const { planetName, weaponName } = ctx.params;

		const weapon = await WeaponRepository.Get(weaponName);

		if (weapon.ammo <= 0) {
			return {
				planetMessage: 'Planet took no damage',
				weaponMessage: 'This weapon has no ammo',
			}
		}

		const { remainingAmmo } = await WeaponRepository.DecreaseAmmo(weaponName)

		const { damage, planetMessage } = await PlanetHelper.Defend(ctx, { weaponName, planetName });

		const weaponMessage = `${weapon.name} did ${damage} damage and left ${remainingAmmo} ammo.`

		return {
			planetMessage,
			weaponMessage,
		}
	}
}

module.exports = new AttackService();
