import { Model, attr, TableState, ORMId } from 'redux-orm'

export default class Movie extends Model<MovieItems> {}

interface MovieItems {
  id: number,
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: Date,
  title: string,
  video: boolean,
  category: string,
  type: string,
  vote_average: number,
  vote_count: number
}

export type MovieState = TableState<MovieItems & ORMId>

Movie.modelName = 'Movie'
Movie.fields = {
  id: attr(),
  adult: attr(),
  backdrop_path: attr(),
  genre_ids: attr(),
  original_language: attr(),
  original_title: attr(),
  overview: attr(),
  popularity: attr(),
  poster_path: attr(),
  release_date: attr(),
  title: attr(),
  video: attr(),
  category: attr(),
  type: attr(),
  vote_average: attr(),
  vote_count: attr()
}
