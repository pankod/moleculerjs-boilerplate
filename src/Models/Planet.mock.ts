import sequelize = require('sequelize');

import { PlanetSql } from '@Interfaces';
import { Planet as RealPlanet } from './Planet';

export module Planet {
	let ModelInstance: sequelize.Model<{}, PlanetSql> = null;
	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = await RealPlanet.Model();

			await ModelInstance.sync();

			await ModelInstance.destroy({
				truncate: true,
				where: {}
			});

			await ModelInstance.create({
				id: 1,
				damage: 1000,
				shield: 4000
			});
		}

		return ModelInstance;
	};
}
