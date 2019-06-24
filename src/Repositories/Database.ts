import sequelize from 'sequelize';

export namespace Database {
	const sequelizeInstance = new sequelize({
		dialect: 'sqlite',
		storage: './db.sqlite',
	});

	export const instance = async (): Promise<sequelize.Sequelize> => {
		await sequelizeInstance.authenticate();
		await sequelizeInstance.sync();

		return sequelizeInstance;
	};

	export const defaultTableConfig = { freezeTableName: true, timestamps: false };
}
