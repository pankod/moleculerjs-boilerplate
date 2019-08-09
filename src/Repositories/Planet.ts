//#region Global Imports
import { getManager } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { Planet } from '@Entities/Planet';
import { getResource } from './Shared';
//#endregion Local Imports

//#region Interface Imports
import { DecreaseShieldOutDto } from '@Interfaces';
//#endregion Interface Imports

export namespace PlanetRepository {
	export const Get = async (planetName: string): Promise<Planet> => {
		return await getResource(Planet, { where: { name: planetName } });
	};

	export const DecreaseShield = async (
		planetName: string,
		remainingShield: number,
	): Promise<DecreaseShieldOutDto> => {
		const planet = await getResource(Planet, { where: { name: planetName } });

		planet.shield = remainingShield;

		await getManager().save(planet);

		return { remainingShield: planet.shield };
	};
}
