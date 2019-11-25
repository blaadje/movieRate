import { createSelector as CR } from 'redux-orm'

import orm from '@core/store/orm'

import { GENRE_FILTER_ID } from './constants'

const createSelector = CR as any

export const activeFilter = createSelector(orm.Filter)

export const discoverResources = createSelector(
  orm,
  activeFilter,
  ({ Discover, Filter }: any, filter: any) => {
    const genreFilter = Filter.withId(GENRE_FILTER_ID)[filter.value].value
    const movies = Discover.first() && Discover.first()[`${filter.value}s`]

    const genreMovies = movies
      ? movies
          .toModelArray()
          .filter((item: any) =>
            item.genres
              .toRefArray()
              .some((item: any) =>
                genreFilter.some((genre: any) => genre === item.id)
              )
          )
      : []

    return genreMovies.length ? genreMovies : movies ? movies.toRefArray() : []
  }
)

export const trendingResources = createSelector(
  orm,
  activeFilter,
  ({ Trending }: any, filter: any) =>
    Trending.first() ? Trending.first()[`${filter.value}s`].toRefArray() : []
)

export const movieGenres = createSelector(
  orm,
  activeFilter,
  ({ Genre }: any, filter: any) =>
    Genre.filter((genre: any) => genre.type.includes(filter.value)).toRefArray()
)
