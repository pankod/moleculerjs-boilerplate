import { getManager, ObjectType, FindOneOptions } from "typeorm";
import { Throw404 } from "./ErrorHelpers";

export const getResource = async <E extends {}>(entityClass: ObjectType<E>, options: {}): Promise<E> => {
  const resource = await getManager().findOne(entityClass, options)

  Throw404(resource, `Resource can't be found with options: ${JSON.stringify(options)}`)

  return resource
}