//#region Global Imports
import { Errors } from 'moleculer';
//#endregion Global Imports

export const Throw404 = <T>(resource: T | undefined, message: string): T => {
	if (!resource) {
		throw new Errors.MoleculerError(message, 404, 'Not Found');
	}
	return resource;
};
