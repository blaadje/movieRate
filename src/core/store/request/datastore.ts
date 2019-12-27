import { promisify } from 'es6-promisify'
import Datastore from 'nedb'

const fromInstance = (nedbInstance: any) => {
  let newDB: any = { nedb: nedbInstance }

  let methods = [
    'loadDatabase',
    'insert',
    'find',
    'findOne',
    'count',
    'update',
    'remove',
    'ensureIndex',
    'removeIndex',
  ]
  methods.forEach(method => {
    newDB[method] = promisify(nedbInstance[method].bind(nedbInstance))
  })

  newDB.cfind = function(query: any, projections: any) {
    const cursor = nedbInstance.find(query, projections)
    cursor.exec = promisify(cursor.exec.bind(cursor))
    return cursor
  }

  newDB.cfindOne = function(query: any, projections: any) {
    const cursor = nedbInstance.findOne(query, projections)
    cursor.exec = promisify(cursor.exec.bind(cursor))
    return cursor
  }

  newDB.ccount = function(query: any) {
    const cursor = nedbInstance.count(query)
    cursor.exec = promisify(cursor.exec.bind(cursor))
    return cursor
  }

  return newDB
}

const datastore = (options: any) => {
  const nedbInstance = new Datastore(options)

  return fromInstance(nedbInstance)
}

export default datastore
