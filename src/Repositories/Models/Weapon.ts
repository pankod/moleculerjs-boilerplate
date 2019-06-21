import sequelize from 'sequelize';

import { WeaponSql } from '@Interfaces';
import { Database } from '@Repositories/Database';

export module Weapon {
	let ModelInstance: sequelize.Model<{}, WeaponSql> = null;

	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = (await Database.instance()).define(
				'Weapons',
				{
					id: {
						allowNull: false,
						primaryKey: true,
						type: sequelize.INTEGER
					},
					name: {
						allowNull: false,
						type: sequelize.STRING
					},
					damage: {
						allowNull: false,
						type: sequelize.INTEGER
					},
					ammo: {
						allowNull: false,
						type: sequelize.INTEGER
					}
				},
				{ ...Database.defaultTableConfig }
			);
		}

		return ModelInstance;
	};
}
