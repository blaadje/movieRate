import { createSelector as CR } from 'redux-orm'

import orm from '@core/store/orm'

import { DISCOVER_FILTER_ID, TRENDING_FILTER_ID } from './constants'

const createSelector = CR as any

export const activeFilter = createSelector(orm.Filter)

export const discoverByType = createSelector(
  orm,
  ({ Discover, Filter }: any) => {
    const discoverFilter = Filter.withId(DISCOVER_FILTER_ID).value

    return Discover.first()
      ? Discover.first()[`${discoverFilter.value}s`].toRefArray()
      : []
  }
)

export const trendingByType = createSelector(
  orm,
  ({ Trending, Filter }: any) => {
    const trendingFilter = Filter.withId(TRENDING_FILTER_ID).value

    return Trending.first()
      ? Trending.first()[`${trendingFilter.value}s`].toRefArray()
      : []
  }
)
