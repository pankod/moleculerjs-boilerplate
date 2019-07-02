//#region Global Imports
import { Context } from 'moleculer';
//#endregion Global Imports

//#region Interface Imports
import { DefendInDto, DefendOutDto } from '@Interfaces';
//#endregion Interface Imports

export namespace PlanetHelper {
	const prefix: string = 'planet';

	export const Defend = async (ctx: Context, params: DefendInDto): Promise<DefendOutDto> =>
		await ctx.call(`${prefix}.Defend`, params);
}
