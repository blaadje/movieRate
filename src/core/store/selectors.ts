import { flatten } from 'lodash'
import { createSelector as CR } from 'redux-orm'

import orm from '@core/store/orm'

import { DISCOVER_FILTER_ID, TRENDING_FILTER_ID } from './constants'

const createSelector = CR as any

export const activeFilter = createSelector(orm.Filter)

export const discoverMovies = createSelector(
  orm,
  ({ Discover, Filter }: any) => {
    const discoverFilter = Filter.withId(DISCOVER_FILTER_ID).value
    const discovers = Discover.filter(
      ({ type }: any) => type === discoverFilter.field
    ).toModelArray()

    return flatten(
      discovers.map((item: any) =>
        item[`${discoverFilter.field}s`].toRefArray()
      )
    )
  }
)

export const trendingMovies = createSelector(
  orm,
  ({ Trending, Filter }: any) => {
    const trendingFilter = Filter.withId(TRENDING_FILTER_ID).value
    const trendings = Trending.filter(
      ({ type }: any) => type === trendingFilter.field
    ).toModelArray()

    return flatten(
      trendings.map((item: any) =>
        item[`${trendingFilter.field}s`].toRefArray()
      )
    )
  }
)
