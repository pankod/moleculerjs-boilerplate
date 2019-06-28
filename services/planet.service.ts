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
import { DefendInDto, DefendOutDto } from '@Interfaces';
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
			planetName: 'string',
			weaponName: 'string'
		},
	})
	public async Defend(ctx: Context<DefendInDto>): Promise<DefendOutDto> {
		const response = await this.DefendMethod(ctx);

		return response;
	}

	@Method
	@POST
	public async DefendMethod(ctx: Context<DefendInDto>): Promise<DefendOutDto> {
		const { planetName, weaponName } = ctx.params
		const { damage, remainingShield } = await PlanetRepository.Defend(weaponName, planetName);

		let message;

		if (remainingShield > 0) {
			message = `Planet took ${damage} damage and has ${remainingShield} shield left.`;
		} else {
			message = 'Planet shield ruined! war is lost!';
		}

		return { damage, planetMessage: message };
	}
}

module.exports = new PlanetService();
