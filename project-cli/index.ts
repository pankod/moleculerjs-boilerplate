#!/usr/bin/env node

import * as chalk from 'chalk';
import * as clear from 'clear';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';

import { modelQuestion } from './helper_scripts/Definitions/Entity';
import { serviceQuestion } from './helper_scripts/Definitions/Service';

clear();

console.log(
	chalk.default(
		figlet.textSync('microservice-cli')
	)
);

const questions = [
	{
		choices: ['entity', 'service'],
		message: 'What would you like to add?',
		name: 'fileType',
		type: 'list'
	}
];

program
	.action(async () => {
		const answers: { fileType: string } = await inquirer.prompt(questions);

		switch (answers.fileType) {
			case 'entity':
			await modelQuestion.showQuestions();
				break;
			case 'service':
			await serviceQuestion.showQuestions();
				break;
			default:
				break;
		}
	});

program.parse(process.argv);
