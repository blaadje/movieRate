// ORM
export const MOVIE = 'movie'
export const SEARCH = 'search'
export const TV = 'tv'
export const DISCOVER = 'discover'
export const TRENDING = 'trending'
export const PLAYLIST = 'playlist'
export const RATE = 'rate'

export type allowedTypes =
  | 'movie'
  | 'tv'
  | 'discover'
  | 'playlist'
  | 'search'
  | 'trending'

export const RESOURCE_FETCHING: any = 'API/RESOURCE_FETCHING'
export const RESOURCE_ERROR: any = 'API/RESOURCE_ERROR'
export const createResourceByType = (resourceType: allowedTypes) =>
  `API/RESOURCE_CREATE_${resourceType.toUpperCase()}`

// FILTERS
export type FilterProps = {
  value: any
  label: string
}
export const SET_FILTER: string = 'filter'
export const MOVIES_FILTER: FilterProps = {
  value: MOVIE,
  label: 'Popular movies',
}
export const TVS_FILTER: FilterProps = {
  value: TV,
  label: 'Popular TVs',
}
export const RATE_FILTER: any = {
  value: 5,
}

export const DISCOVER_FILTER_ID = 0
export const TRENDING_FILTER_ID = 1
export const RATE_FILTER_ID = 2
