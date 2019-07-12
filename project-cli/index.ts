#!/usr/bin/env node

import * as chalk from 'chalk';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';

import { modelQuestion } from './helper_scripts/Definitions/Entity';
import { serviceQuestion } from './helper_scripts/Definitions/Service';

console.clear();

console.log(
	chalk.default(
		figlet.textSync('microservice-cli')
	)
);

const questions = [
	{
		choices: ['Entity', 'Service'],
		message: 'What would you like to add?',
		name: 'fileType',
		type: 'list'
	}
];

program
	.action(async () => {
		const answers: { fileType: string } = await inquirer.prompt(questions);

		switch (answers.fileType) {
			case 'Entity':
			await modelQuestion.showQuestions();
				break;
			case 'Service':
			await serviceQuestion.showQuestions();
				break;
			default:
				break;
		}
	});

program.parse(process.argv);
