// Global Imports
import { Context } from 'moleculer';
import { DefendInDto, DefendOutDto } from '@Interfaces';

// Local Imports

export namespace PlanetHelper {
	const prefix: string = 'planet';

	export const Defend = async (ctx: Context, params: DefendInDto): Promise<DefendOutDto> =>
		await ctx.call(`${prefix}.Defend`, params);
}
