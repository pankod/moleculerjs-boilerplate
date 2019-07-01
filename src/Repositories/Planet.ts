// Global Imports

// Local Imports
import { Planet } from '@Entities/Planet';
import { getManager } from 'typeorm';
import { UpdateShieldOutDto } from '@Interfaces';
import { Throw404 } from './ErrorHelpers';

export namespace PlanetRepository {
	const getPlanet = async (planetName: string): Promise<Planet> => {
		const planet = await getManager().findOne(Planet, { name: planetName })

		Throw404(planet, `Planet '${planetName}' can't be found!`)

		return planet
	}

	export const Get = async (planetName: string): Promise<Planet> => {
		return await getPlanet(planetName)
	}

	export const UpdateShield = async (planetName: string, remainingShield: number): Promise<UpdateShieldOutDto> => {
		const planet = await getPlanet(planetName)

		planet.shield = remainingShield

		await getManager().save(planet)

		return { remainingShield: planet.shield }
	}
}
