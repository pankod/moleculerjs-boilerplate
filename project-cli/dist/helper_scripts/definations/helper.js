"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logSymbols = require("log-symbols");
const mustache = require("mustache");
const path = require("path");
exports.Config = {
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
    getTemplate: (templatePath, templateProps) => (mustache.render(fs.readFileSync(path.resolve('', templatePath), 'utf8'), templateProps)),
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
        const interfaceFilePath = `${exports.Config.interfaceDir}/${answers.upperFileName}/${answers.upperFileName}.d.ts`;
        const interfaceDirPath = `${exports.Config.interfaceDir}/${answers.upperFileName}`;
        const writeFileProps = {
            dirPath: interfaceFilePath,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Created new interface file.'
        };
        const addIndexParams = {
            dirPath: `${exports.Config.interfaceDir}/index.ts`,
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
            dirPath: `${exports.Config.modelDir}/${answers.fileName}.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Model Instance.'
        };
        const addIndexParams = {
            dirPath: `${exports.Config.modelDir}/index.ts`,
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
            dirPath: `${exports.Config.mockModelDir}/${answers.fileName}.mock.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Mock Model Instance.'
        };
        const addIndexParams = {
            dirPath: `${exports.Config.mockModelDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Mock Model added to index.ts.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
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
            dirPath: `${exports.Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Service Helper'
        };
        const addIndexParams = {
            dirPath: `${exports.Config.servicesHelperDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Service Helper added to index.ts.'
        };
        const serviceHelperTestParams = {
            templatePath: './helper_scripts/templates/tests/serviceHelper.mustache',
            templateProps,
            answers,
            dirPath: `${exports.Config.serviceHelperTestDir}/${answers.fileName}.spec.ts`,
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
            dirPath: `${exports.Config.repositoriesDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Repository added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${exports.Config.repositoriesDir}/${answers.fileName}.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Repository.'
        };
        const repositoryTestParams = {
            templatePath: './helper_scripts/templates/tests/repository.mustache',
            templateProps,
            answers,
            dirPath: `${exports.Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Repository test.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        if (!exports.Helper.isAlreadyExist(exports.Config.interfaceDir, answers.fileName)) {
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
            dirPath: `${exports.Config.servicesDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Service added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${exports.Config.servicesDir}/${answers.fileName}.service.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Service.'
        };
        const serviceTestParams = {
            templatePath: './helper_scripts/templates/tests/service.mustache',
            templateProps,
            answers,
            dirPath: `${exports.Config.servicesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Micro Service test.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        if (!exports.Helper.isAlreadyExist(exports.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers);
        }
        exports.Helper.createServiceHelper(answers);
        exports.Helper.createTest(serviceTestParams);
    }
};
//# sourceMappingURL=helper.js.map