import * as inquirer from 'inquirer';
import { DefinationsModel } from './Defination';
import { Config, Helper  } from './helper';

export const modelQuestion = {
	showQuestions: async (): Promise<void> => {
		const questions = [
			{
				message: 'Enter model name',
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
							return 'Already added use new model name';
						}

						return true;
					}

					return 'Cannot be empty';
				}
			}
		];

		const answers: DefinationsModel.IAnswers = await inquirer.prompt<{ fileName: string}>(questions);

		answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
		Helper.createModel(answers);

	}
};
