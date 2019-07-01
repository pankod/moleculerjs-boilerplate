import * as fs from 'fs';
import * as logSymbols from 'log-symbols';
import * as mustache from 'mustache';
import * as path from 'path';
import { Config } from '../../config';
import { DefinitionsModel } from './Definition';

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

	createInterface: (answers: DefinitionsModel.IAnswers) => {
		const templatePath = './helper_scripts/Templates/Interfaces/Interface.mustache';
		const indexInterfaceTemplate = './helper_scripts/Templates/Interfaces/index.mustache';

		const templateProps = { fileName: answers.fileName, upperFileName: answers.upperFileName };
		const interfaceFilePath = `${Config.interfaceDir}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
		const interfaceDirPath = `${Config.interfaceDir}/${answers.upperFileName}`;

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

		Helper.createFile(interfaceDirPath);
		Helper.writeFile(writeFileProps);
		Helper.addToIndex(addIndexParams);
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
			dirPath: `${Config.serviceHelperTestDir}/${answers.fileName}.spec.ts`,
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
			templatePath: './helper_scripts/Templates/Tests/Repository.mustache',
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
			templatePath: './helper_scripts/Templates/Tests/Service.mustache',
			templateProps,
			answers,
			dirPath: `${Config.servicesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Microservice test.\n'
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
