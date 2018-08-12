import { Model, attr } from 'redux-orm'
import { API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'

export default class Movie extends Model<any> {
  static reducer (action: any, Movie: any): any {
    switch (action.type) {
      case API_FETCH_SUCCESS:
        action.payload.map((item: Movie) => Movie.create(item))
        break
    }

    return undefined
  }
}

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
  vide: attr(),
  category: attr(),
  type: attr(),
  vote_average: attr(),
  vote_count: attr()
}
