import { Planet } from '@Entities/Planet';
import { getManager } from 'typeorm';
import { UpdateShieldOutDto } from '@Interfaces';

export namespace PlanetRepository {
	const getPlanet = async (planetName: string): Promise<Planet> => {
		return getManager().findOne(Planet, { name: planetName })
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
