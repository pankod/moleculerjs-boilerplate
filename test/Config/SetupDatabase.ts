import Seeder from '@Test/Seeder';
import CreateConnection from './CreateConnection';

const setupDatabase = async (): Promise<void> => {
	await CreateConnection();

	await Seeder.seed();
};

export default setupDatabase;
