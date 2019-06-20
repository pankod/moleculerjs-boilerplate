// Global Imports
import { Context } from 'moleculer';

// Local Imports
import { FireInDto, FireOutDto } from '@Interfaces';

export module FireHelper {

	const prefix: string = 'fire';

	export const Fire = async (ctx: Context, params: FireInDto): Promise<FireOutDto> => await ctx.call(`${prefix}.Fire`, params);

}
