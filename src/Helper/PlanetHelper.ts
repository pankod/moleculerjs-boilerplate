// Global Imports
import { Context } from 'moleculer';

// Local Imports

export namespace PlanetHelper {
	const prefix: string = 'planet';

	export const Defend = async (ctx: Context, params: any): Promise<any> =>
		await ctx.call(`${prefix}.Defend`, params);
}
