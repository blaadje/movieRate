import orm from '@core/store/orm'

import { DISCOVER_MOVIES } from '../constants'

function defaultUpdater(session: any, action: object) {
  session.sessionBoundModels.forEach((modelClass: any) => {
    if (typeof modelClass.reducer === 'function') {
      modelClass.reducer(action, modelClass, session)
    }
  })
}

function createReducer(orm: any, updater = defaultUpdater) {
  return (state: any, action: object) => {
    const session = orm.session(state || orm.getEmptyState())

    // if there's no db yet we generate our default models
    if (!state) {
      session.Filter.create({ type: 'filter', value: DISCOVER_MOVIES })
    }
    updater(session, action)
    return session.state
  }
}

export default createReducer(orm)
