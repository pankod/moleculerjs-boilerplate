import * as fs from 'fs';
import * as logSymbols from 'log-symbols';
import * as mustache from 'mustache';
import * as path from 'path';

import { DefinationsModel } from './Defination';

export const Config = {
	repositoriesDir: '../src/Repositories',
	interfaceDir: '../src/Interfaces',
	modelDir: '../src/Models',
	mockModelDir: '../src//Models',
	repositoriesTestDir: '../test/unit/Repositories',
	servicesDir: '../services',
	servicesHelperDir: '../src/Helper',
	servicesTestDir: '../test/unit/MicroServices',
	serviceHelperTestDir: '../test/unit/Helper'
};

export const Helper = {

	isAlreadyExist: (startPath: string, val: string, isFile?: boolean): boolean => {
		val = val.replace(/\b\w/g, foo => foo.toUpperCase());

		const _path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;

		return fs.existsSync(path.resolve('', _path));
	},

	isServiceAlreadyExist: (startPath: string, val: string): boolean => {
		val = val.replace(/\b\w/g, foo => foo.toLowerCase());

		const _path = `${startPath}/${val}.service.ts`;

		return fs.existsSync(path.resolve('', _path));
	},

	getTemplate: (templatePath: string, templateProps: DefinationsModel.ITemplateProps): string => (

		mustache.render(
			fs.readFileSync(path.resolve('', templatePath), 'utf8'),
			templateProps
		)
	),

	createFile: (dirPath: string): void => {
		fs.mkdirSync(path.resolve('', dirPath));
	},

	writeFile: (params: DefinationsModel.IWriteFile) => {
		fs.writeFile(
			path.resolve('', params.dirPath),
			params.getFileContent(),
			err => {
				if (err) throw err;
				console.log(logSymbols.success, params.message);
			}
		);
	},

	addToIndex: (params: DefinationsModel.IAddIndex): void => {
		fs.appendFile(
			path.resolve('', params.dirPath),
			`${params.getFileContent()}\n`,
			err => {
				if (err) throw err;
				console.log(logSymbols.success, params.message);
			}
		);
	},

	createInterface: (answers: DefinationsModel.IAnswers) => {
		const templatePath = './helper_scripts/templates/interfaces/interface.mustache';
		const indexInterfaceTemplate = './helper_scripts/templates/interfaces/index.mustache';

		const templateProps = { fileName: answers.fileName, upperFileName: answers.upperFileName };
		const interfaceFilePath = `${Config.interfaceDir}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
		const interfaceDirPath = `${Config.interfaceDir}/${answers.upperFileName}`;

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: interfaceFilePath,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new interface file.'
		};

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.interfaceDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexInterfaceTemplate, templateProps),
			message: 'Interface added to index.ts.'
		};

		Helper.createFile(interfaceDirPath);
		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
	},

	createModelInstance: (answers: DefinationsModel.IAnswers) => {
		const templatePath = './helper_scripts/templates/repositories/model.mustache';
		const templateProps = { fileName: answers.fileName };
		const indexTemplate = './helper_scripts/templates/repositories/model_index.mustache';

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${Config.modelDir}/${answers.fileName}.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Model Instance.'
		};

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.modelDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Model added to index.ts.'
		};

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
	},

	createMockModel: (answers: DefinationsModel.IAnswers) => {
		const templatePath = './helper_scripts/templates/repositories/mock.mustache';
		const templateProps = { fileName: answers.fileName };
		const indexTemplate = './helper_scripts/templates/repositories/mock_index.mustache';

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${Config.mockModelDir}/${answers.fileName}.mock.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Mock Model Instance.'
		};

		Helper.writeFile(writeFileProps);
	},

	createTest: (options: DefinationsModel.ICreateTest): void => {

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => Helper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		Helper.writeFile(writeFileProps);
	},

	createServiceHelper: (answers: DefinationsModel.IAnswers): void => {
		const templatePath = './helper_scripts/templates/services/helper.mustache';
		const indexTemplate = './helper_scripts/templates/services/helper_index.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Service Helper'
		};

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.servicesHelperDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Service Helper added to index.ts.'
		};

		const serviceHelperTestParams = {
			templatePath: './helper_scripts/templates/tests/serviceHelper.mustache',
			templateProps,
			answers,
			dirPath: `${Config.serviceHelperTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Micro Service Helper test.'
		};

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
		Helper.createTest(serviceHelperTestParams);
	},

	createModel: (answers: DefinationsModel.IAnswers): void => {
		const templatePath = './helper_scripts/templates/repositories/repository.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const indexTemplate = './helper_scripts/templates/repositories/repo_index.mustache';

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.repositoriesDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Repository added to index.ts.'
		};

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${Config.repositoriesDir}/${answers.fileName}.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Repository.'
		};

		const repositoryTestParams = {
			templatePath: './helper_scripts/templates/tests/repository.mustache',
			templateProps,
			answers,
			dirPath: `${Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Repository test.'
		};

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);

		if (!Helper.isAlreadyExist(Config.interfaceDir, answers.fileName)) {
			Helper.createInterface(answers);
		}

		Helper.createModelInstance(answers);
		Helper.createMockModel(answers);
		Helper.createTest(repositoryTestParams);
	},

	createService: (answers: DefinationsModel.IAnswers): void => {
		const templatePath = './helper_scripts/templates/services/service.mustache';
		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName,
			isPrivate: answers.isPrivate
		};

		const indexTemplate = './helper_scripts/templates/services/index.mustache';

		const addIndexParams: DefinationsModel.IAddIndex = {
			dirPath: `${Config.servicesDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Service added to index.ts.'
		};

		const writeFileProps: DefinationsModel.IWriteFile = {
			dirPath: `${Config.servicesDir}/${answers.fileName}.service.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Service.'
		};

		const serviceTestParams = {
			templatePath: './helper_scripts/templates/tests/service.mustache',
			templateProps,
			answers,
			dirPath: `${Config.servicesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Micro Service test.'
		};

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);

		if (!Helper.isAlreadyExist(Config.interfaceDir, answers.fileName)) {
			Helper.createInterface(answers);
		}

		Helper.createServiceHelper(answers);
		Helper.createTest(serviceTestParams);
	}

}
