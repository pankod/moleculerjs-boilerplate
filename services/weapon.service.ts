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
import { DamageInDto, WarMessageOutDto } from '@Interfaces';
import { PlanetHelper } from '@Helper';
import { FireMethodOutDto } from '@Interfaces/Fire/FireMethodOutDto';
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
			damage: 'number',
		},
	})
	public async Fire(ctx: Context<DamageInDto>): Promise<FireMethodOutDto> {
		const response = await this.FireMethod(ctx);

		return response;
	}

	@Method
	@POST
	public async FireMethod(ctx: Context<DamageInDto>): Promise<FireMethodOutDto> {
		const { shield } = await WeaponRepository.Fire();
		const { damage } = ctx.params;

		const { deathStar, alderaan } = await PlanetHelper.Defend(ctx, { damage });

		let message;

		if (shield > 0) {
			message = `Planet took ${damage} damage and has ${alderaan.shield} shield left.`;
		} else {
			message = 'Planet shield ruined! war is lost!';
		}

		const response: FireMethodOutDto = {
			weapon: deathStar,
			planet: alderaan,
			message,
		};

		return response;
	}
}

module.exports = new WeaponService();
