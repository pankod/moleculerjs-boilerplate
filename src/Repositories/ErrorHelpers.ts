import { Errors } from 'moleculer'

export const Throw404 = (resource: any, message: string) => {
	if (!resource) {
		throw new Errors.MoleculerError(message, 404, "Not Found")
	}
}