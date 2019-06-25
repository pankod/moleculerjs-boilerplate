import sequelize from 'sequelize';

import { WeaponSql } from '@Interfaces';
import { Weapon as RealWeapon } from './Weapon';

export namespace Weapon {
	let ModelInstance: sequelize.Model<{}, {}> = null;

	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = await RealWeapon.Model();

			await ModelInstance.sync();

			await ModelInstance.destroy({
				truncate: true,
				where: {},
			});

			await ModelInstance.create({
				id: 1,
				name: 'Death Star',
				damage: 1000,
				ammo: 10000,
			});
		}

		return ModelInstance;
	};
}
