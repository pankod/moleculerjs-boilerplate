"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const helper_1 = require("./helper");
const config_1 = require("../../config");
exports.modelQuestion = {
    showQuestions: () => __awaiter(this, void 0, void 0, function* () {
        const questions = [
            {
                message: 'Enter model name',
                name: 'fileName',
                type: 'input',
                validate(val) {
                    if (val.length) {
                        if (helper_1.Helper.isAlreadyExist(config_1.Config.repositoriesDir, val, true)) {
                            return 'Already added use new model name';
                        }
                        return true;
                    }
                    return 'Cannot be empty';
                }
            }
        ];
        const answers = yield inquirer.prompt(questions);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        helper_1.Helper.createModel(answers);
    })
};
//# sourceMappingURL=model.js.map