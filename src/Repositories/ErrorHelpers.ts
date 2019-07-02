//#region Global Imports
import { Errors } from 'moleculer';
//#endregion Global Imports

export const Throw404 = (resource: any, message: string) => {
	if (!resource) {
		throw new Errors.MoleculerError(message, 404, 'Not Found');
	}
};
