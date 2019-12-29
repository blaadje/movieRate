import { remote } from 'electron'
import path from 'path'

import datastore from './datastore'

const db: any = {}
db.movie = datastore({
  filename: path.join(remote.app.getPath('userData'), '/movie.db'),
  autoload: true,
})
db.tv = datastore({
  filename: path.join(remote.app.getPath('userData'), '/tv.db'),
  autoload: true,
})

export default function request(
  resourceType: string,
  { method }: any,
  resource?: any
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
