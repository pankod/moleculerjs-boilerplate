import sequelize from 'sequelize';

import { PlanetSql } from '@Interfaces';
import { Database } from '@Repositories/Database';

export namespace Planet {
	let ModelInstance: sequelize.Model<{}, {}> = null;

	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = (await Database.instance()).define(
				'Planets',
				{
					id: {
						allowNull: false,
						primaryKey: true,
						type: sequelize.INTEGER,
					},
					name: {
						allowNull: false,
						type: sequelize.STRING,
					},
					shield: {
						allowNull: false,
						type: sequelize.INTEGER,
					},
				},
				{ ...Database.defaultTableConfig },
			);
		}

		return ModelInstance;
	};
}
