import sequelize from 'sequelize';

export namespace Database {
	const sequelizeInstance = new sequelize('', '', '', {
		dialect: 'sqlite',
		storage: './test/db.test.sqlite',
		logging: false,
	});

	export const instance = async (): Promise<sequelize.Sequelize> => {
		await sequelizeInstance.authenticate();
		await sequelizeInstance.sync();

		return sequelizeInstance;
	};

	export const defaultTableConfig = { freezeTableName: true, timestamps: false };
}
