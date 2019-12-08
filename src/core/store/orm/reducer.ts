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
import { ORMModels } from './model'

export interface FilterProps {
  value: string | number | [] | null
  label?: string
}

const createDefaultState = ({ Filter, Genre }: ORMModels) => {
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

  Filter.create({ type: DISCOVER, ...MOVIES_FILTER })
  Filter.create({ type: TRENDING, ...MOVIES_FILTER })
  Filter.create({ type: RATE, ...rateFilter })
  Filter.create({ type: GENRE, ...genreFilter })
  Filter.create({ type: 'year', ...yearfilter })
  genres.forEach(genre => Genre.create(genre))
}

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
      createDefaultState(session)
    }
    updater(session, action)
    return session.state
  }
}

export default createReducer(orm)
