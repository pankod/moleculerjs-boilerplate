//#region Global Imports
import { Context } from 'moleculer';
//#endregion Global Imports

//#region Interface Imports
import { IPlanet } from '@Interfaces';
//#endregion Interface Imports

export namespace PlanetHelper {
	const prefix: string = 'planet';

	export const Defend = async (ctx: Context, params: IPlanet.DefendInDto): Promise<IPlanet.DefendOutDto> =>
		await ctx.call(`${prefix}.Defend`, params);
}
