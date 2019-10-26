import { Model, fk } from 'redux-orm'
import Movie from 'core/store/orm/models/Movie'

export default class Rate extends Model<typeof Rate, RateItem> {
  static reducer(action: any, Movie: any): any {}
}

interface RateItem {
  movieId: number
  rate: number
  description: string
  movie: Movie
}

Rate.modelName = 'Rate'
Rate.fields = {
  movie: fk('Movie'),
}
