import sequelize = require('sequelize');

import { DeathStarSql } from '@Interfaces';
import { DeathStar as RealDeathStar } from './DeathStar';

export module Weapon {
	let ModelInstance: sequelize.Model<{}, DeathStarSql> = null;
	export const Model = async () => {
		if (!ModelInstance) {
			ModelInstance = await RealDeathStar.Model();

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
