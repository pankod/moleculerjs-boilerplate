// Global Imports
import { Context } from 'moleculer';

// Local Imports
import { FireInDto, FireOutDto } from '@Interfaces';

export module DeathStarHelper {

	const prefix: string = 'deathstar';

	export const Fire = async (ctx: Context, params: FireInDto): Promise<FireOutDto> => await ctx.call(`${prefix}.Fire`, params);

}
