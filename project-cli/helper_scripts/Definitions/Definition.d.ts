
export declare module DefinitionsModel {

	export interface ITemplateProps {
		fileName?: string;
		upperFileName?: string;
		isPrivate?: boolean;
	}

	export interface IAnswers {
		fileName: string;
		upperFileName: string;
		isPrivate?: boolean;

	}

	export interface IAddIndex {
		dirPath: string;
		getFileContent: Function;
		message: string;
	}

	export interface IWriteFile {
		dirPath: string;
		getFileContent: Function;
		message: string;
	}

	export interface ICreateTest {
		templatePath: string;
		templateProps: ITemplateProps;
		answers: IAnswers;
		dirPath: string;
		successMessage: string;
	}

	export interface IReplaceContent {
		filetoUpdate: string;
		fileDir: string;
		regexKey: RegExp;
		message: string;
		getFileContent(): string;
	}
	
}
