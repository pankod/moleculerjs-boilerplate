import { CalculateMeta } from '@Meta';
import { FireResult } from '@Interfaces';

import * as fs from 'fs';
import * as path from 'path';

const db = JSON.parse(fs.readFileSync(path.resolve('src/', 'db.json'), 'utf8'));

export module WeaponRepository {
	export const Fire = async (): Promise<FireResult> => {

		const getDeathStarAttack = await CalculateMeta.getDeathStarAttack();

		return getDeathStarAttack;
	};
}
