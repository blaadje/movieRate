import orm from '@core/store/orm'
import genres from '@core/store/orm/resourcesModels/Genre/genresList'

import {
  DISCOVER,
  GENRE,
  MOVIE,
  MOVIES_FILTER,
  RATE,
  TRENDING,
  TV,
} from '../constants'

export interface FilterProps {
  value: string | number | [] | null
  label?: string
}

const rateFilter: FilterProps = {
  value: 1,
}

const genreFilter: { [resourceType: string]: FilterProps } = {
  [MOVIE]: {
    value: [],
  },
  [TV]: {
    value: [],
  },
}

const yearfilter: FilterProps = {
  value: null,
}

const createDefaultState = (localOrm: any) => {
  const state = localOrm.getEmptyState()
  const { Filter, Genre } = localOrm.mutableSession(state)

  Filter.create({ type: DISCOVER, ...MOVIES_FILTER })
  Filter.create({ type: TRENDING, ...MOVIES_FILTER })
  Filter.create({ type: RATE, ...rateFilter })
  Filter.create({ type: GENRE, ...genreFilter })
  Filter.create({ type: 'year', ...yearfilter })
  genres.forEach(genre => Genre.create(genre))

  return state
}

function defaultUpdater(session: any, action: object) {
  session.sessionBoundModels.forEach((modelClass: any) => {
    if (typeof modelClass.reducer === 'function') {
      modelClass.reducer(action, modelClass, session)
    }
  })
}

function createReducer(orm: any, updater = defaultUpdater) {
  return (state: any, action: any) => {
    const session = orm.session(state || createDefaultState(orm))

    updater(session, action)
    return session.state
  }
}

export default createReducer(orm)
