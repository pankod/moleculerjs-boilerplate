//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
import { Accept, BodyOptions, Path, POST } from 'typescript-rest';
import { Example, IsInt, Produces, Response, Tags } from 'typescript-rest-swagger';
//#endregion Global Imports


//#region Local Imports
import { } from '@Repositories';
import { CacheService } from '@Services';
import { FireRepository } from '@Repositories';
//#endregion Local Imports

//#region Interface Imports
import { } from '@Interfaces';
//#endregion Interface Imports
@Path('fire')
@Accept('application/json; charset=utf-8')
@Produces('application/json; charset=utf-8')
@BodyOptions({ extended: true, type: 'application/json; charset=utf-8' })
@Tags('FireServices')
export class FireService extends BaseSchema {

	public name: string = 'fire';

	@Action({
		params: {
			damage: 'number'
		}
	})
	public async Fire(ctx: Context<any>): Promise<string> {
		const response = await this.FireMethod(ctx.params.damage);

		return response;
	}

	@Method
	@POST
	public async FireMethod(damage: number): Promise<string> {
		const result = await FireRepository.Fire(damage);

		return result;
	}

}

module.exports = new FireService();
