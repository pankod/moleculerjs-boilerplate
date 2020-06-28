//#region Global Imports
import { Context, Service as MoleculerService } from 'moleculer';
import { Action, Method, Service } from 'moleculer-decorators';
import { getConnection } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { PlanetRepository, WeaponRepository } from '@Repositories';
import { CalculateMeta } from '@Meta';
import { Planet, Weapon } from '@Entities';
import connectionInstance from '@Entities/Connection';
//#endregion Local Imports

//#region Interface Imports
import { IPlanet } from '@Interfaces';
//#endregion Interface Imports

@Service({
	name: 'planet',
})
class PlanetService extends MoleculerService {
	@Action({
		params: {
			weaponName: { type: 'string', min: 2 },
			planetName: { type: 'string', min: 2 },
		},
	})
	public async Defend(ctx: Context<IPlanet.DefendInDto>): Promise<IPlanet.DefendOutDto> {
		const response = await this.DefendMethod(ctx);

		return response;
	}

	@Method
	/**
	 * @swagger
	 *
	 *  /planet/Defend:
	 *    post:
	 *      description: Attacks to the planet with given weapon.
	 *      produces:
	 *        - application/json
	 *      consumes:
	 *        - application/json
	 *      parameters:
	 *        - in: body
	 *          name: params
	 *          schema:
	 *            type: object
	 *            required:
	 *              - weaponName
	 *              - planetName
	 *            properties:
	 *              weaponName:
	 *                type: string
	 *                example: Death Star
	 *              planetName:
	 *                type: string
	 *                example: Alderaan
	 *      responses:
	 *        200:
	 *          description: Example attack result
	 *        422:
	 *          description: Missing parameters
	 */
	public async DefendMethod(ctx: Context<IPlanet.DefendInDto>): Promise<IPlanet.DefendOutDto> {
		const { planetName, weaponName } = ctx.params;

		const planet: Planet = await PlanetRepository.Get(planetName);
		const weapon: Weapon = await WeaponRepository.Get(weaponName);

		const { damage, remainingShield } = await CalculateMeta.Damage(weapon, planet);

		await PlanetRepository.DecreaseShield(planetName, remainingShield);

		let message;

		if (remainingShield > 0) {
			message = `Planet took ${damage} damage and has ${remainingShield} shield left.`;
		} else {
			message = 'Planet shield ruined! war is lost!';
		}

		return { damage, planetMessage: message };
	}

	public async started() {
		return await connectionInstance();
	}

	public async stopped() {
		return await getConnection().close();
	}
}

module.exports = PlanetService;
