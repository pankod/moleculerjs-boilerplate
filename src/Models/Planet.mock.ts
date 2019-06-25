import sequelize from 'sequelize';

import { PlanetSql } from '@Interfaces';
import { Planet as RealPlanet } from './Planet';

export namespace Planet {
	let ModelInstance: sequelize.Model<{}, PlanetSql> = null;
	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = await RealPlanet.Model();

			await ModelInstance.sync();

			await ModelInstance.destroy({
				truncate: true,
				where: {},
			});

			await ModelInstance.create({
				id: 1,
				name: 'Alderaan',
				shield: 100000,
			});
		}

		return ModelInstance;
	};
}
