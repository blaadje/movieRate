import { Model, attr, fk } from 'redux-orm'
import { RESOURCE_CREATE, RESOURCE_DELETE, RESOURCE_EDIT } from 'core/sagas/resourcesSaga/constants'

export default class Rate extends Model<any> {
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

Rate.modelName = 'Rate'
Rate.fields = {
  movieId: attr(),
  rate: attr(),
  description: attr(),
  movie: fk('Movie')
}
