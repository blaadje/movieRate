import orm from '@core/store/orm'
import genres from '@core/store/orm/resourcesModels/Genre/genresList'

import {
  DISCOVER,
  GENRE,
  GENRE_FILTER,
  MOVIES_FILTER,
  RATE,
  RATE_FILTER,
  TRENDING,
} from '../constants'

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
      session.Filter.create({ type: DISCOVER, ...MOVIES_FILTER })
      session.Filter.create({ type: TRENDING, ...MOVIES_FILTER })
      session.Filter.create({ type: RATE, ...RATE_FILTER })
      session.Filter.create({ type: GENRE, ...GENRE_FILTER })
      genres.forEach(genre => session.Genre.create(genre))
    }
    updater(session, action)
    return session.state
  }
}

export default createReducer(orm)
