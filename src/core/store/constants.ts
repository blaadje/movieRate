// ORM
export const MOVIE = 'movie'
export const TV = 'tv'
export const DISCOVER = 'discover'
export const PLAYLIST = 'playlist'

export type allowedTypes = 'movie' | 'tv' | 'discover' | 'playlist'

export const RESOURCE_FETCHING: any = 'API/RESOURCE_FETCHING'
export const RESOURCE_ERROR: any = 'API/RESOURCE_ERROR'
export const createResourceByType = (resourceType: allowedTypes) =>
  `API/RESOURCE_CREATE_${resourceType.toUpperCase()}`

// FILTERS
export type filterProps = {
  key: number
  field: string
}
export const SET_DISCOVER_FILTER: string = 'filter/DISCOVER'
export const DISCOVER_MOVIES: filterProps = {
  key: 0,
  field: MOVIE,
}
export const DISCOVER_TVS: filterProps = {
  key: 1,
  field: TV,
}
