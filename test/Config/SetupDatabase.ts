//#region Local Imports
import Seeder from '../Seeder';
import CreateConnection from './Connection';
//#region Local Imports

const setupDatabase = async (): Promise<void> => {
	await CreateConnection();

	await Seeder.seed();
};

export default setupDatabase;
