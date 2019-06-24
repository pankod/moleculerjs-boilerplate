// Global Imports
import { Context } from 'moleculer';

// Local Imports
import { FireInDto, FireOutDto } from '@Interfaces';

export namespace WeaponHelper {
	const prefix: string = 'weapon';

	export const Fire = async (ctx: Context, params: FireInDto): Promise<FireOutDto> =>
		await ctx.call(`${prefix}.Fire`, params);
}
