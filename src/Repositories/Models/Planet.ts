import sequelize from 'sequelize';

import { PlanetSql } from '@Interfaces';
import { Database } from '@Repositories/Database';

export module Planet {
	let ModelInstance: sequelize.Model<{}, PlanetSql> = null;

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
					damage: {
						allowNull: false,
						type: sequelize.INTEGER
					},
					shield: {
						type: sequelize.INTEGER
					}
				},
				{ ...Database.defaultTableConfig }
			);
		}

		return ModelInstance;
	};
}
