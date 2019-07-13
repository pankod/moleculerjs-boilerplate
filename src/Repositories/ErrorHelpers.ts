//#region Global Imports
import { Errors } from 'moleculer';
//#endregion Global Imports

export const Throw404 = <R extends {}>(resource: R | undefined, message: string): R => {
	if (!resource) {
		throw new Errors.MoleculerError(message, 404, 'Not Found');
	}
	return resource;
};
