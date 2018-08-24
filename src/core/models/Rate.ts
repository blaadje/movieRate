import { Model, attr, fk, ORMId, TableState } from 'redux-orm'
import { RESOURCE_CREATE, RESOURCE_DELETE, RESOURCE_EDIT } from 'core/sagas/resourcesSaga/constants'
import Movie from 'core/models/Movie'

export default class Rate extends Model<RateItems> {
  static reducer (action: any, Movie: any): any {
    switch (action.type) {
      case RESOURCE_CREATE:
        Rate.create(action.resource)
        break
      case RESOURCE_EDIT:

      case RESOURCE_DELETE:
    }

    return undefined
  }
}

interface RateItems {
  movieId: number,
  rate: number,
  description: string,
  movie: Movie
}

export type RateState = TableState<RateItems & ORMId>

Rate.modelName = 'Rate'
Rate.fields = {
  movieId: attr(),
  rate: attr(),
  description: attr(),
  movie: fk('Movie')
}
