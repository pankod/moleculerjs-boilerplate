import { PlanetSql } from '@Interfaces';
import { Planet } from '@Repositories/Models';
import { CalculateMeta } from '@Meta';

export module PlanetRepository {
	export const Defend = async (damage: number): Promise<number> => {
		return CalculateMeta.Damage(damage);
	};
}
