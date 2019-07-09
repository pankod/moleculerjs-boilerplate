//#region Global Imports
import * as fs from 'fs';
import * as logSymbols from 'log-symbols';
import * as mustache from 'mustache';
import * as path from 'path';
//#endregion Global Imports

//#region Local Imports
import { Config } from '../../config';
import { DefinitionsModel } from './Definition';
//#endregion Local Imports

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

	getTemplate: (templatePath: string, templateProps: DefinitionsModel.ITemplateProps): string => (

		mustache.render(
			fs.readFileSync(path.resolve('project-cli', templatePath), 'utf8'),
			templateProps
		)
	),

	createFile: (dirPath: string): void => {
		fs.mkdirSync(path.resolve('', dirPath));
	},

	writeFile: (params: DefinitionsModel.IWriteFile) => {
		fs.writeFile(
			path.resolve('', params.dirPath),
			params.getFileContent(),
			err => {
				if (err) throw err;
				console.log(logSymbols.success, params.message);
			}
		);
	},

	addToIndex: (params: DefinitionsModel.IAddIndex): void => {
		fs.appendFile(
			path.resolve('', params.dirPath),
			`${params.getFileContent()}\n`,
			err => {
				if (err) throw err;
				console.log(logSymbols.success, params.message);
			}
		);
	},

	createInterface: (answers: DefinitionsModel.IAnswers, dirType: string, prefix: string = '') => {
		const templatePath = `./helper_scripts/Templates/Interfaces/${prefix}Interface.mustache`;
		const indexInterfaceTemplate = './helper_scripts/Templates/Interfaces/index.mustache';
		const folderIndexTemplate = './helper_scripts/Templates/Interfaces/FolderIndex.mustache';

		const templateProps = { upperFileName: answers.upperFileName, dirType };
		const interfaceFilePath = `${Config.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
		const interfaceDirPath = `${Config.interfaceDir}/${dirType}/${answers.upperFileName}`;

		const writeFileProps: DefinitionsModel.IWriteFile = {
			dirPath: interfaceFilePath,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Created new interface file.'
		};

		const addIndexParams: DefinitionsModel.IAddIndex = {
			dirPath: `${Config.interfaceDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexInterfaceTemplate, templateProps),
			message: 'Interface added to index.ts.'
		};

		const addFolderIndex: DefinitionsModel.IAddIndex = {
			dirPath: `${Config.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
			getFileContent: () => Helper.getTemplate(folderIndexTemplate, templateProps),
			message: 'Interface added to folder index.ts.'
		};

		Helper.createFile(interfaceDirPath);
		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
		Helper.addToIndex(addFolderIndex);
	},

	createEntityInstance: (answers: DefinitionsModel.IAnswers) => {
		const templatePath = './helper_scripts/Templates/Repositories/Entity.mustache';
		const templateProps = { fileName: answers.fileName };
		const indexTemplate = './helper_scripts/Templates/Repositories/EntityIndex.mustache';

		const writeFileProps: DefinitionsModel.IWriteFile = {
			dirPath: `${Config.entityDir}/${answers.fileName}.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Entity Instance.'
		};

		const addIndexParams: DefinitionsModel.IAddIndex = {
			dirPath: `${Config.entityDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Entity added to index.ts.'
		};

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
	},

	createTest: (options: DefinitionsModel.ICreateTest): void => {

		const writeFileProps: DefinitionsModel.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => Helper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		Helper.writeFile(writeFileProps);
	},

	createIntegrationTest: (options: DefinitionsModel.ICreateTest): void => {

		const integrationProps: DefinitionsModel.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => Helper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		Helper.writeFile(integrationProps);
	},

	createServiceHelper: (answers: DefinitionsModel.IAnswers): void => {
		const templatePath = './helper_scripts/Templates/Services/Helper.mustache';
		const indexTemplate = './helper_scripts/Templates/Services/HelperIndex.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const writeFileProps: DefinitionsModel.IWriteFile = {
			dirPath: `${Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Service Helper'
		};

		const addIndexParams: DefinitionsModel.IAddIndex = {
			dirPath: `${Config.servicesHelperDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Service Helper added to index.ts.'
		};

		const serviceHelperTestParams = {
			templatePath: './helper_scripts/Templates/Tests/ServiceHelper.mustache',
			templateProps,
			answers,
			dirPath: `${Config.serviceHelperTestDir}/${answers.upperFileName}.spec.ts`,
			successMessage: 'Added new Micro Service Helper test.'
		};

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
		Helper.createTest(serviceHelperTestParams);
	},

	createRepository: (answers: DefinitionsModel.IAnswers): void => {
		const templatePath = './helper_scripts/Templates/Repositories/Repository.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const indexTemplate = './helper_scripts/Templates/Repositories/RepoIndex.mustache';

		const addIndexParams: DefinitionsModel.IAddIndex = {
			dirPath: `${Config.repositoriesDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Repository added to index.ts.'
		};

		const writeFileProps: DefinitionsModel.IWriteFile = {
			dirPath: `${Config.repositoriesDir}/${answers.fileName}.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Repository.'
		};

		const repositoryTestParams = {
			answers,
			dirPath: `${Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Repository test.',
			templatePath: './helper_scripts/Templates/Tests/Repository.mustache',
			templateProps
		};

		if (!Helper.isAlreadyExist(Config.interfaceDir, answers.fileName)) {
			Helper.createInterface(answers, 'Repositories');
		}

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
		Helper.createEntityInstance(answers);
		Helper.createTest(repositoryTestParams);
	},

	createService: (answers: DefinitionsModel.IAnswers): void => {
		const templatePath = './helper_scripts/Templates/Services/Service.mustache';
		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName,
			isPrivate: answers.isPrivate
		};

		const indexTemplate = './helper_scripts/Templates/Services/index.mustache';

		const addIndexParams: DefinitionsModel.IAddIndex = {
			dirPath: `${Config.servicesDir}/index.ts`,
			getFileContent: () => Helper.getTemplate(indexTemplate, templateProps),
			message: 'Service added to index.ts.'
		};

		const writeFileProps: DefinitionsModel.IWriteFile = {
			dirPath: `${Config.servicesDir}/${answers.fileName}.service.ts`,
			getFileContent: () => Helper.getTemplate(templatePath, templateProps),
			message: 'Added new Service.'
		};

		const serviceTestParams = {
			answers,
			dirPath: `${Config.servicesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Microservice test.\n',
			templatePath: './helper_scripts/Templates/Tests/Service.mustache',
			templateProps
		};

		const integrationTestParams = {
			answers,
			dirPath: `${Config.integrationTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Integration test.\n',
			templatePath: './helper_scripts/Templates/Tests/IntegrationTest.mustache',
			templateProps
		};

		if (!Helper.isAlreadyExist(Config.interfaceDir, answers.fileName)) {
			Helper.createInterface(answers, 'Services', 'Service');
		}

		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
		Helper.createServiceHelper(answers);
		Helper.createTest(serviceTestParams);
		Helper.createIntegrationTest(integrationTestParams);
	}
};
