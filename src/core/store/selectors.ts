import { createSelector as CR } from 'redux-orm'
import orm from 'core/store/orm'

const createSelector = CR as any

export const activeFilter = createSelector(orm.Filter)

export const discoverMovies = createSelector(
  orm,
  ({ Discover, Filter }: any) => {
    const discoverFilter = Filter.withId(0).value
    const discover = Discover.withId(discoverFilter.key)

    return discover && discover[`${discoverFilter.field}s`].toRefArray()
  }
)
