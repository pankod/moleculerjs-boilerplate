import { PlanetSql } from '@Interfaces';
import { Planet } from '@Repositories/Models';

export module PlanetRepository {
	export const Defend = async (damage: number): Promise<string> => {
		// const model = await Planet.Model();

		return 'DEFEND!';
	};
}
