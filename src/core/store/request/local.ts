import { remote } from 'electron'
import path from 'path'

import datastore from './datastore'

const db: any = {}
db.movie = datastore({
  filename: path.join(remote.app.getPath('userData'), '/movie.db'),
  autoload: true,
})

export default async function request(
  resourceType: string,
  resource: any,
  { method }: any
) {
  const database = db[resourceType]

  switch (method) {
    case 'GET':
      return database.find(resource)
    case 'PUT':
      return database.update(resource)
    case 'DELETE':
      return database.delete(resource)
    case 'POST':
      return database.insert(resource)
  }
}
