//#region Global Imports
import { Context } from 'moleculer';
import { Action, BaseSchema, Method } from 'moleculer-decorators';
//#endregion Global Imports

//#region Local Imports
import { PlanetRepository, WeaponRepository } from '@Repositories';
import { CalculateMeta } from '@Meta';
import { Planet, Weapon } from '@Entities';
//#endregion Local Imports

//#region Interface Imports
import { DefendInDto, DefendOutDto } from '@Interfaces';
//#endregion Interface Imports

export class PlanetService extends BaseSchema {
	public name: string = 'planet';

	@Action({
		params: {
			weaponName: { type: 'string', min: 2 },
			planetName: { type: 'string', min: 2 },
		},
	})
	public async Defend(ctx: Context<DefendInDto>): Promise<DefendOutDto> {
		const response = await this.DefendMethod(ctx);

		return response;
	}

	@Method
	public async DefendMethod(ctx: Context<DefendInDto>): Promise<DefendOutDto> {
		const { planetName, weaponName } = ctx.params;

		const planet: Planet = await PlanetRepository.Get(planetName);
		const weapon: Weapon = await WeaponRepository.Get(weaponName);

		const { damage, remainingShield } = await CalculateMeta.Damage(weapon, planet);

		await PlanetRepository.UpdateShield(planetName, remainingShield);

		let message;

		if (remainingShield > 0) {
			message = `Planet took ${damage} damage and has ${remainingShield} shield left.`;
		} else {
			message = 'Planet shield ruined! war is lost!';
		}

		return { damage, planetMessage: message };
	}
}

module.exports = new PlanetService();
