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

		}
	})
	public async Fire(ctx: Context<any>): Promise<object> {
		const response = await this.FireMethod();

		return response;
	}

	@Method
	@POST
	public async FireMethod(): Promise<object> {
		const result = await this.FireRepository.Fire();

		return result;
	}

}

module.exports = new FireService();
