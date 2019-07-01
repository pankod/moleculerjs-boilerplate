import { Errors } from 'moleculer'

export const Throw404 = (message: string) => {
  throw new Errors.MoleculerError(message, 404, "Not Found")
}