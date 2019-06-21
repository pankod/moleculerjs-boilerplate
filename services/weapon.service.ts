//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
import { Accept, BodyOptions, Path, POST } from 'typescript-rest';
import { Example, IsInt, Produces, Response, Tags } from 'typescript-rest-swagger';
//#endregion Global Imports

//#region Local Imports
import { WeaponRepository } from '@Repositories';
//#endregion Local Imports

//#region Interface Imports
import { DamageInDto, WarMessageOutDto } from '@Interfaces';
import { PlanetHelper } from '@Helper';
//#endregion Interface Imports
@Path('deathstar')
@Accept('application/json; charset=utf-8')
@Produces('application/json; charset=utf-8')
@BodyOptions({ extended: true, type: 'application/json; charset=utf-8' })
@Tags('DeathStarServices')
export class WeaponService extends BaseSchema {

	public name: string = 'weapon';

	@Action({
		params: {
			damage: 'number'
		}
	})
	public async Fire(ctx: Context<DamageInDto>): Promise<WarMessageOutDto> {
		const response = await this.FireMethod(ctx);

		return response;
	}

	@Method
	@POST
	public async FireMethod(ctx: Context<DamageInDto>): Promise<WarMessageOutDto> {
		const { deathStar, alderaan } = await WeaponRepository.Fire();

		let message;
		let remainingShield;

		if (alderaan.shield > 0) {
			remainingShield = await PlanetHelper.Defend(ctx, { damage: deathStar.damage });
		} else {
			message.planet = 'Planet shield ruined! war is lost!';
		}

		message = {
			deathStar: `Attacked with ${deathStar.damage} damage`,
			planet: `Remaining shield: ${alderaan.shield}`
		};

		return message;
	}

}

module.exports = new WeaponService();
