// Global Imports
import { Context } from 'moleculer';

// Local Imports
import { } from '@Interfaces';

export module PlanetHelper {

	const prefix: string = 'planet';

	export const Defend = async (ctx: Context, params: any): Promise<any> => await ctx.call(`${prefix}.Defend`, params);

}
