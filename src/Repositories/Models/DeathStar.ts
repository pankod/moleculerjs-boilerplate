import sequelize from 'sequelize';

import { DeathStarSql } from '@Interfaces';
import { Database } from '@Repositories/Database';

export module DeathStar {
	let ModelInstance: sequelize.Model<{}, DeathStarSql> = null;

	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = (await Database.instance()).define(
				'tableName',
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
