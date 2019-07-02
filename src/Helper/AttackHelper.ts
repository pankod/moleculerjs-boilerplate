//#region Global Imports
import { Context } from 'moleculer';
//#endregion Global Imports

//#region Interface Imports
import { AttackInDto, AttackOutDto } from '@Interfaces';
//#endregion Interface Imports

export namespace AttackHelper {
	const prefix: string = 'attack';

	export const Fire = async (ctx: Context, params: AttackInDto): Promise<AttackOutDto> =>
		await ctx.call(`${prefix}.Fire`, params);
}
