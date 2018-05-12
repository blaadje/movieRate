import {
  MOVIES_FETCH,
  MOVIES_SET
} from './constants'
import { Movie } from 'core/model'
import { Action } from 'redux'

export function moviesFetch (result: Array<Movie>): Object {
  return { type: MOVIES_FETCH, result: result }
}

export function moviesSet (result: Array<Movie>): Object {
  return { type: MOVIES_SET, result: result }
}
