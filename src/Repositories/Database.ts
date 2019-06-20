import sequelize from 'sequelize';

export module Database {
	const sequelizeInstance = new sequelize('test', 'test', 'asdasd', {
		host: '',
		dialect: '',
		operatorsAliases: false
	});


	export const instance = async (): Promise<sequelize.Sequelize> => {
		await sequelizeInstance.authenticate();
		await sequelizeInstance.sync();

		return sequelizeInstance;
	};

	export const defaultTableConfig = { freezeTableName: true, timestamps: false };
}
