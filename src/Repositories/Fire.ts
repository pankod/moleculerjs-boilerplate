import { WeaponSql } from '@Interfaces';
import { Weapon } from '@Repositories/Models';

export module FireRepository {
	export const Fire = async (): Promise<any> => {
		const model = await Weapon.Model();

		return 'ATTACK!';
	};
}
