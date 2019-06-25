import { createConnection } from 'typeorm'

export const connectionInstance = async () => await createConnection({
  type: 'sqlite',
  name: 'default',
  database: "./db.sqlite",
  entities: [
    __dirname + "/Entities/*.ts"
  ],
  synchronize: true,
})