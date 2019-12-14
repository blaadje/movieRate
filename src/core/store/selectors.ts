import { capitalize, deburr } from 'lodash'
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
  ({ Discover, Tv, Movie, Filter, Search }: any, resourceFilter: any) => {
    const filteredGenres = Filter.withId(GENRE_FILTER_ID)[resourceFilter.value]
      .value
    const filteredRate = Filter.withId(RATE_FILTER_ID).value
    const filteredDate = Filter.withId(YEAR_FILTER_ID).value
    const isSearching = Boolean(Search.last()?.query)
    const resources: any = {
      Movie,
      Tv,
    }
    const movies = isSearching
      ? resources[capitalize(resourceFilter.value)].all()
      : Discover.first()?.[`${resourceFilter.value}s`]

    if (!movies) {
      return []
    }

    const byName = ({ title, original_title, original_name }: any) =>
      deburr(title || original_name)
        .toLowerCase()
        .includes(
          Search.last() ? deburr(Search.last().query).toLowerCase() : ''
        ) ||
      deburr(original_title || original_name)
        .toLowerCase()
        .includes(
          Search.last() ? deburr(Search.last().query).toLowerCase() : ''
        )

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

    return movies
      .toModelArray()
      .filter(
        (movie: any) =>
          byName(movie) && byRate(movie) && byGenre(movie) && byYear(movie)
      )
      .sort(
        (a: any, b: any) => new Date(b.release_date) < new Date(a.release_date)
      )
  }
)

export const movieVideos = createSelector(
  orm,
  activeFilter,
  ({ Movie, Tv }: any, filter: any) => {
    const resources: any = {
      Movie,
      Tv,
    }
    const currentResource = resources[capitalize(filter.value)]

    return currentResource
      .all()
      .toModelArray()
      .reduce(
        (map: any, resource: any) => ({
          ...map,
          [resource.id]: resource.videos.toRefArray(),
        }),
        {}
      )
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
