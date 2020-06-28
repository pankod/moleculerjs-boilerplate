//#region Global Imports
import { getManager, ObjectType } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { Throw404 } from './ErrorHelpers';
//#endregion Local Imports

export const getResource = async <T>(
	entityClass: ObjectType<T>,
	options: Record<string, unknown>,
): Promise<T> => {
	const resource = await getManager().findOne(entityClass, options);

	Throw404(resource, `Resource can't be found with options: ${JSON.stringify(options)}`);

	return resource as T;
};
