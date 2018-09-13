import { Model, attr, TableState, ORMId, fk } from 'redux-orm'
import { ORMState } from 'core/model'
import { API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'

export default class Movie extends Model<MovieItems> {
  static reducer (action: any, Movie: any): ORMState | undefined {
    switch (action.type) {
      case API_FETCH_SUCCESS:
        action.payload.map((item: MovieItems) => Movie.create(item))
        break
    }

    return undefined
  }
}

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
  categoryId: string,
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
  type: attr(),
  vote_average: attr(),
  vote_count: attr(),
  categoryId: fk({
    to: 'Category',
    as: 'category',
    relatedName: 'movies'
  } as any),
  subCategoryId: fk({
    to: 'Subcategory',
    as: 'subcategory',
    relatedName: 'movies'
  } as any)
}
