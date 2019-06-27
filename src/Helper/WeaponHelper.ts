// Global Imports
import { Context } from 'moleculer';

// Local Imports
import { AttackInDto, AttackOutDto } from '@Interfaces';

export namespace WeaponHelper {
	const prefix: string = 'weapon';

	export const Fire = async (ctx: Context, params: AttackInDto): Promise<AttackOutDto> =>
		await ctx.call(`${prefix}.Fire`, params);
}
