// ORM
export const MOVIE = 'movie'
export const SEARCH = 'search'
export const TV = 'tv'
export const DISCOVER = 'discover'
export const PLAYLIST = 'playlist'

export type allowedTypes = 'movie' | 'tv' | 'discover' | 'playlist' | 'search'

export const RESOURCE_FETCHING: any = 'API/RESOURCE_FETCHING'
export const RESOURCE_ERROR: any = 'API/RESOURCE_ERROR'
export const createResourceByType = (resourceType: allowedTypes) =>
  `API/RESOURCE_CREATE_${resourceType.toUpperCase()}`

// FILTERS
export type filterProps = {
  field: string
  label: string
}
export const SET_DISCOVER_FILTER: string = 'filter/DISCOVER'
export const DISCOVER_MOVIES: filterProps = {
  field: MOVIE,
  label: 'Popular movies',
}
export const DISCOVER_TVS: filterProps = {
  field: TV,
  label: 'Popular TVs',
}
