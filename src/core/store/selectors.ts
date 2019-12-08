import { createSelector as CR } from 'redux-orm'

import orm from '@core/store/orm'

import {
  DEFAULT,
  GENRE_FILTER_ID,
  RATE_FILTER_ID,
  YEAR_FILTER_ID,
} from './constants'

const createSelector = CR as any

export const activeFilter = createSelector(orm.Filter)

export const discoverResources = createSelector(
  orm,
  activeFilter,
  ({ Discover, Movie, Filter, Search }: any, resourceFilter: any) => {
    const filteredGenres = Filter.withId(GENRE_FILTER_ID)[resourceFilter.value]
      .value
    const filteredRate = Filter.withId(RATE_FILTER_ID).value
    const filteredDate = Filter.withId(YEAR_FILTER_ID).value
    // const movies =
    //   Discover.first() && Discover.first()[`${resourceFilter.value}s`]

    // if (!movies) {
    //   return []
    // }

    const byName = ({ title }: any) => {
      return title
        .toLowerCase()
        .includes(Search.last() ? Search.last().query.toLowerCase() : '')
    }

    const byGenre = ({ genres }: any) => {
      const moviesByGenre = genres
        .toRefArray()
        .some((item: any) =>
          filteredGenres.some((genre: any) => genre === item.id)
        )

      return filteredGenres.length ? moviesByGenre : true
    }

    const byRate = ({ vote_average }: any) => vote_average >= filteredRate

    const byYear = ({ release_date, first_air_date }: any) => {
      const year = new Date(release_date || first_air_date).getFullYear()

      return filteredDate && filteredDate !== DEFAULT
        ? year === filteredDate
        : true
    }

    return Movie.all()
      .toModelArray()
      .filter(
        (movie: any) =>
          byName(movie) && byRate(movie) && byGenre(movie) && byYear(movie)
      )
      .sort((a: any, b: any) => b.release_date - a.release_date)
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
