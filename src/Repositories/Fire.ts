import { WeaponSql } from '@Interfaces';
import { Weapon } from '@Repositories/Models';
import { CalculateMeta } from '@Meta';

import * as fs from 'fs';
import * as path from 'path';

const db = JSON.parse(fs.readFileSync(path.resolve('src/', 'db.json'), 'utf8'));

export module FireRepository {
	export const Fire = async (damage: number): Promise<number> => {
		let result = 0;

		if (damage > 0) {
			await CalculateMeta.Damage(damage);
		}

		const getDeathStarAttack = await CalculateMeta.getDeathStarAttack();

		return getDeathStarAttack.ammo;
	};
}
