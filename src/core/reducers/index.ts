import { combineReducers } from 'redux'
import orm from 'core/orm'
import { ORM, ORMCommonState } from 'redux-orm'

function defaultUpdater (session: any, action: object) {
  session.sessionBoundModels.forEach((modelClass: any) => {
    if (typeof modelClass.reducer === 'function') {
      modelClass.reducer(action, modelClass, session)
    }
  })
}

function createReducer (orm: ORM<ORMCommonState>, updater = defaultUpdater) {
  return (state: any, action: object) => {
    const session = orm.session(state || orm.getEmptyState())

    // if there's no db yet we generate our default models
    if (!state) {
      session.Filter.create({ category: 'movie', id: 0 })
    }
    updater(session, action)
    return session.state
  }
}

const reducer = createReducer(orm)

export default combineReducers({ Application: reducer })
