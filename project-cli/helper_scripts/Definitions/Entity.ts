import * as inquirer from 'inquirer';
import { Config } from '../../config';
import { DefinitionsModel } from './Definition';
import { Helper } from './Helper';

export const modelQuestion = {
	showQuestions: async (): Promise<void> => {
		const questions = [
			{
				message: 'Enter entity name',
				name: 'fileName',
				type: 'input',
				validate(val: string): string | boolean {
					if (val.length) {
						if (
							Helper.isAlreadyExist(
								Config.repositoriesDir,
								val,
								true
							)
						) {
							return 'Already added use new entity name';
						}

						return true;
					}

					return 'Cannot be empty';
				}
			}
		];

		const answers: DefinitionsModel.IAnswers = await inquirer.prompt<{ fileName: string}>(questions);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		Helper.createRepository(answers);

	}
};
