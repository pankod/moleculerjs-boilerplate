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
exports.serviceQuestion = {
    showQuestions: () => __awaiter(this, void 0, void 0, function* () {
        const questions = [
            {
                message: 'Enter service name',
                name: 'fileName',
                type: 'input',
                validate(val) {
                    if (val.length) {
                        if (helper_1.Helper.isServiceAlreadyExist(config_1.Config.servicesDir, val)) {
                            return 'Already added use new service name';
                        }
                        return true;
                    }
                    return 'Cannot be empty';
                }
            },
            {
                default: true,
                message: 'Is service open to outside ?',
                name: 'isPrivate',
                type: 'confirm'
            },
        ];
        const answers = yield inquirer.prompt(questions);
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        helper_1.Helper.createService(answers);
    })
};
//# sourceMappingURL=service.js.map