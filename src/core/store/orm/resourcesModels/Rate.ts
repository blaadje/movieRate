import { fk, Model } from 'redux-orm'

import Movie from '@core/store/orm/resourcesModels/Movie'

export default class Rate extends Model<typeof Rate, RateItem> {}

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
