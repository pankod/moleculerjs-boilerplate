//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
import { Accept, BodyOptions, Path, POST } from 'typescript-rest';
import { Produces, Tags } from 'typescript-rest-swagger';
//#endregion Global Imports

//#region Local Imports
import { PlanetRepository } from '@Repositories';
//#endregion Local Imports

//#region Interface Imports
import { DefendOutDto } from '@Interfaces';
//#endregion Interface Imports
@Path('planet')
@Accept('application/json; charset=utf-8')
@Produces('application/json; charset=utf-8')
@BodyOptions({ extended: true, type: 'application/json; charset=utf-8' })
@Tags('PlanetServices')
export class PlanetService extends BaseSchema {
	public name: string = 'planet';

	@Action({
		params: {
			damage: 'number',
		},
	})
	public async Defend(ctx: Context<any>): Promise<DefendOutDto> {
		const response = await this.DefendMethod(ctx.params.damage);

		return response;
	}

	@Method
	@POST
	public async DefendMethod(damage: number): Promise<DefendOutDto> {
		const result = await PlanetRepository.Defend(damage);

		return result;
	}
}

module.exports = new PlanetService();
