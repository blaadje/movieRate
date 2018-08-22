import { Model, attr } from 'redux-orm'
import { RESOURCE_VISIBILITY_FILTER } from 'core/sagas/resourcesSaga/constants'

export default class Filter extends Model<any> {
  constructor (args: any) {
    super(args)
  }

  static reducer (action: any, Filter: any): any {
    switch (action.type) {
      case RESOURCE_VISIBILITY_FILTER:
        Filter.withId(0).update({ category: action.result })
    }

    return undefined
  }
}

Filter.modelName = 'Filter'
Filter.fields = {
  id: attr(),
  category: attr()
}