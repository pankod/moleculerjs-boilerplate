//#region Global Imports
import { Context } from 'moleculer';
//#endregion Global Imports

//#region Interface Imports
import { IAttack } from '@Interfaces';
//#endregion Interface Imports

export namespace AttackHelper {
	const prefix: string = 'attack';

	export const Fire = async (ctx: Context, params: IAttack.FireInDto): Promise<IAttack.FireOutDto> =>
		await ctx.call(`${prefix}.Fire`, params);
}
