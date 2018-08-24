import { Model, attr, TableState, ORMId } from 'redux-orm'
import { RESOURCE_VISIBILITY_FILTER } from 'core/sagas/resourcesSaga/constants'

export default class Filter extends Model<FilterItems> {
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

interface FilterItems {
  category: string
}

export type FilterState = TableState<FilterItems & ORMId>

Filter.modelName = 'Filter'
Filter.fields = {
  id: attr(),
  category: attr()
}
