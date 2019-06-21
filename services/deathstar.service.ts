//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
import { Accept, BodyOptions, Path, POST } from 'typescript-rest';
import { Example, IsInt, Produces, Response, Tags } from 'typescript-rest-swagger';
//#endregion Global Imports

//#region Local Imports
import { DeathStarRepository } from '@Repositories';
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
export class DeathStarService extends BaseSchema {

	public name: string = 'fire';

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
		const result = await DeathStarRepository.Fire();

		const message = {
			deathStar: `Attacked with ${ctx.params.damage} damage`,
			planet: `Remaining shield: ${result.shield}`
		};

		if (result.shield > 0) {
			PlanetHelper.Defend(ctx, { damage: ctx.params.damage});
		} else {
			message.planet = 'Planet shield ruined! war lost!';
		}

		return message;
	}

}

module.exports = new DeathStarService();
