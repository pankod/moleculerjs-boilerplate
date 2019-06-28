// Global Imports
import { Context } from 'moleculer';

// Local Imports
import { AttackInDto, AttackOutDto } from '@Interfaces';

export namespace AttackHelper {
	const prefix: string = 'attack';

	export const Fire = async (ctx: Context, params: AttackInDto): Promise<AttackOutDto> =>
		await ctx.call(`${prefix}.Fire`, params);
}
