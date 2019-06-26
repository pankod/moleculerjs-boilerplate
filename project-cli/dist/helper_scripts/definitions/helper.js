"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logSymbols = require("log-symbols");
const mustache = require("mustache");
const path = require("path");
const config_1 = require("../../config");
exports.Helper = {
    isAlreadyExist: (startPath, val, isFile) => {
        val = val.replace(/\b\w/g, foo => foo.toUpperCase());
        const _path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;
        return fs.existsSync(path.resolve('', _path));
    },
    isServiceAlreadyExist: (startPath, val) => {
        val = val.replace(/\b\w/g, foo => foo.toLowerCase());
        const _path = `${startPath}/${val}.service.ts`;
        return fs.existsSync(path.resolve('', _path));
    },
    getTemplate: (templatePath, templateProps) => (mustache.render(fs.readFileSync(path.resolve('project-cli', templatePath), 'utf8'), templateProps)),
    createFile: (dirPath) => {
        fs.mkdirSync(path.resolve('', dirPath));
    },
    writeFile: (params) => {
        fs.writeFile(path.resolve('', params.dirPath), params.getFileContent(), err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    },
    addToIndex: (params) => {
        fs.appendFile(path.resolve('', params.dirPath), `${params.getFileContent()}\n`, err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    },
    createInterface: (answers) => {
        const templatePath = './helper_scripts/templates/interfaces/interface.mustache';
        const indexInterfaceTemplate = './helper_scripts/templates/interfaces/index.mustache';
        const templateProps = { fileName: answers.fileName, upperFileName: answers.upperFileName };
        const interfaceFilePath = `${config_1.Config.interfaceDir}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
        const interfaceDirPath = `${config_1.Config.interfaceDir}/${answers.upperFileName}`;
        const writeFileProps = {
            dirPath: interfaceFilePath,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Created new interface file.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.interfaceDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexInterfaceTemplate, templateProps),
            message: 'Interface added to index.ts.'
        };
        exports.Helper.createFile(interfaceDirPath);
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
    },
    createModelInstance: (answers) => {
        const templatePath = './helper_scripts/templates/repositories/model.mustache';
        const templateProps = { fileName: answers.fileName };
        const indexTemplate = './helper_scripts/templates/repositories/model_index.mustache';
        const writeFileProps = {
            dirPath: `${config_1.Config.modelDir}/${answers.fileName}.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Model Instance.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.modelDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Model added to index.ts.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
    },
    createMockModel: (answers) => {
        const templatePath = './helper_scripts/templates/repositories/mock.mustache';
        const templateProps = { fileName: answers.fileName };
        const indexTemplate = './helper_scripts/templates/repositories/mock_index.mustache';
        const writeFileProps = {
            dirPath: `${config_1.Config.mockModelDir}/${answers.fileName}.mock.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Mock Model Instance.'
        };
        exports.Helper.writeFile(writeFileProps);
    },
    createTest: (options) => {
        const writeFileProps = {
            dirPath: options.dirPath,
            getFileContent: () => exports.Helper.getTemplate(options.templatePath, options.templateProps),
            message: options.successMessage
        };
        exports.Helper.writeFile(writeFileProps);
    },
    createServiceHelper: (answers) => {
        const templatePath = './helper_scripts/templates/services/helper.mustache';
        const indexTemplate = './helper_scripts/templates/services/helper_index.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Service Helper'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.servicesHelperDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Service Helper added to index.ts.'
        };
        const serviceHelperTestParams = {
            templatePath: './helper_scripts/templates/tests/serviceHelper.mustache',
            templateProps,
            answers,
            dirPath: `${config_1.Config.serviceHelperTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Micro Service Helper test.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        exports.Helper.createTest(serviceHelperTestParams);
    },
    createModel: (answers) => {
        const templatePath = './helper_scripts/templates/repositories/repository.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const indexTemplate = './helper_scripts/templates/repositories/repo_index.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.repositoriesDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Repository added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.repositoriesDir}/${answers.fileName}.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Repository.'
        };
        const repositoryTestParams = {
            templatePath: './helper_scripts/templates/tests/repository.mustache',
            templateProps,
            answers,
            dirPath: `${config_1.Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Repository test.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        if (!exports.Helper.isAlreadyExist(config_1.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers);
        }
        exports.Helper.createModelInstance(answers);
        exports.Helper.createMockModel(answers);
        exports.Helper.createTest(repositoryTestParams);
    },
    createService: (answers) => {
        const templatePath = './helper_scripts/templates/services/service.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName,
            isPrivate: answers.isPrivate
        };
        const indexTemplate = './helper_scripts/templates/services/index.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.servicesDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Service added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.servicesDir}/${answers.fileName}.service.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Service.'
        };
        const serviceTestParams = {
            templatePath: './helper_scripts/templates/tests/service.mustache',
            templateProps,
            answers,
            dirPath: `${config_1.Config.servicesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Micro Service test.\n'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        if (!exports.Helper.isAlreadyExist(config_1.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers);
        }
        exports.Helper.createServiceHelper(answers);
        exports.Helper.createTest(serviceTestParams);
    }
};
//# sourceMappingURL=helper.js.map