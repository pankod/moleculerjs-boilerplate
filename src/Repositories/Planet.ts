//#region Global Imports
import { getManager } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { Planet } from '@Entities/Planet';
import { getResource } from './Shared';
//#endregion Local Imports

//#region Interface Imports
import { UpdateShieldOutDto } from '@Interfaces';
//#endregion Interface Imports

export namespace PlanetRepository {
	export const Get = async (planetName: string): Promise<Planet> => {
		return await getResource(Planet, { name: planetName });
	};

	export const UpdateShield = async (
		planetName: string,
		remainingShield: number,
	): Promise<UpdateShieldOutDto> => {
		const planet = await getResource(Planet, { name: planetName });

		planet.shield = remainingShield;

		await getManager().save(planet);

		return { remainingShield: planet.shield };
	};
}
