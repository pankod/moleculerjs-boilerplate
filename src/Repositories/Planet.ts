// Global Imports
import { Errors } from 'moleculer'

// Local Imports
import { Planet } from '@Entities/Planet';
import { getManager } from 'typeorm';
import { UpdateShieldOutDto } from '@Interfaces';

const { MoleculerError } = Errors;

export namespace PlanetRepository {
	const getPlanet = async (planetName: string): Promise<Planet> => {
		const planet = await getManager().findOne(Planet, { name: planetName })

		if (!planet) {
			throw new MoleculerError(`Planet '${planetName}' can't be found!`, 404, "Not Found")
		}

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
