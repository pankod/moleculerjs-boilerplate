// Global Imports

// Local Imports
import { Planet } from '@Entities/Planet';
import { getManager } from 'typeorm';
import { UpdateShieldOutDto } from '@Interfaces';
import { Throw404 } from './ErrorHelpers';
import { getResource } from './Shared';

export namespace PlanetRepository {
	export const Get = async (planetName: string): Promise<Planet> => {
		return await getResource(Planet, { name: planetName })
	}

	export const UpdateShield = async (planetName: string, remainingShield: number): Promise<UpdateShieldOutDto> => {
		const planet = await getResource(Planet, { name: planetName })

		planet.shield = remainingShield

		await getManager().save(planet)

		return { remainingShield: planet.shield }
	}
}
