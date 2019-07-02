//#region Global Imports
import * as inquirer from 'inquirer';
//#region Global Imports

//#region Local Imports
import { Config } from '../../config';
import { DefinitionsModel } from './Definition';
import { Helper } from './Helper';
//#endregion Local Imports

export const serviceQuestion = {
	showQuestions: async (): Promise<void> => {
		const questions = [
			{
				message: 'Enter service name',
				name: 'fileName',
				type: 'input',
				validate(val: string): string | boolean {
					if (val.length) {
						if (
							Helper.isServiceAlreadyExist(
								Config.servicesDir,
								val
							)
						) {
							return 'Already added use new service name';
						}

						return true;
					}

					return 'Cannot be empty';
				}
			},
			{
				default: true,
				message: 'Is service open to outside ?',
				name: 'isPrivate',
				type: 'confirm'
			},
		];

		const answers: DefinitionsModel.IAnswers = await inquirer.prompt<{ fileName: string }>(questions);
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		Helper.createService(answers);
	}
};
