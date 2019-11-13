// ORM
export const MOVIE = 'movie'
export const SEARCH = 'search'
export const TV = 'tv'
export const DISCOVER = 'discover'
export const TRENDING = 'trending'
export const PLAYLIST = 'playlist'

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
export type filterProps = {
  field: string
  label: string
}
export const SET_FILTER: string = 'filter'
export const MOVIES_FILTER: filterProps = {
  field: MOVIE,
  label: 'Popular movies',
}
export const TVS_FILTER: filterProps = {
  field: TV,
  label: 'Popular TVs',
}

export const DISCOVER_FILTER_ID = 0
export const TRENDING_FILTER_ID = 1
