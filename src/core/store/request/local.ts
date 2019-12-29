import { remote } from 'electron'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

const adapter = new FileSync(
  path.join(remote.app.getPath('userData'), '/database.json')
)
const db: any = low(adapter)

db.defaults({ movie: [], tv: [] }).write()

export default function request(
  resourceType: string,
  { method }: any,
  resource?: any
) {
  switch (method) {
    case 'GET':
      return db.getState()[resourceType]
    case 'PUT':
      return db
        .get(resourceType)
        .find({ id: resource.id })
        .assign(resource)
        .write()
    case 'DELETE':
    case 'POST':
      return db
        .get(resourceType)
        .push(resource)
        .write()
  }
}
