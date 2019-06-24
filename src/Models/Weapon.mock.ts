import sequelize = require('sequelize');

import { WeaponSql } from '@Interfaces';
import { Weapon as RealWeapon } from './Weapon';

export module Weapon {
	let ModelInstance: sequelize.Model<{}, WeaponSql> = null;

	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = await RealWeapon.Model();

			await ModelInstance.sync();

			await ModelInstance.destroy({
				truncate: true,
				where: {}
			});

			await ModelInstance.create({
				id: 1,
				name: 'default attack',
				damage: 1000,
				ammo: 10000
			});
		}

		return ModelInstance;
	};
}
