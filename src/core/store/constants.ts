import { FilterProps } from './orm/reducer'

export const DEFAULT = 'default'

// ORM
export const MOVIE = 'movie'
export const SEARCH = 'search'
export const TV = 'tv'
export const DISCOVER = 'discover'
export const TRENDING = 'trending'
export const PLAYLIST = 'playlist'
export const RATE = 'rate'
export const GENRE = 'genre'
export const VIDEO = 'videos'

export type allowedTypes =
  | 'videos'
  | 'movie'
  | 'tv'
  | 'discover'
  | 'playlist'
  | 'search'
  | 'trending'
  | 'genre'

export const RESOURCE_FETCHING: string = 'API/RESOURCE_FETCHING'
export const RESOURCE_FETCHING_MORE: string = 'API/RESOURCE_FETCHING_MORE'
export const RESOURCE_EDIT: string = 'LOCAL/RESOURCE_EDIT'
export const RESOURCE_CREATE: string = 'LOCAL/RESOURCE_CREATE'
export const RESOURCE_ERROR: string = 'ALL/RESOURCE_ERROR'
export const insertResourceByType = (resourceType: allowedTypes) =>
  `RESOURCE_INSERT_${resourceType.toUpperCase()}`
export const createResourceByType = (resourceType: allowedTypes) =>
  `LOCAL/RESOURCE_CREATE_${resourceType.toUpperCase()}`

// FILTERS
export const SET_FILTER: string = 'filter'
export const MOVIES_FILTER: FilterProps = {
  value: MOVIE,
  label: 'Popular movies',
}

export const TVS_FILTER: FilterProps = {
  value: TV,
  label: 'Popular TVs',
}

// filters IDs
export const DISCOVER_FILTER_ID = 0
export const TRENDING_FILTER_ID = 1
export const RATE_FILTER_ID = 2
export const GENRE_FILTER_ID = 3
export const YEAR_FILTER_ID = 4
