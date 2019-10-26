import Model from 'redux-orm'
import { SET_DISCOVER_FILTER } from 'core/store/constants'

export default class Filter extends Model<typeof Filter, FilterItem> {
  static reducer(action: any, Filter: any): any {
    switch (action.type) {
      case SET_DISCOVER_FILTER:
        Filter.withId(0).update({ value: action.filter })
    }
  }
}

export interface FilterItem {
  type: string
  value: string
}

Filter.modelName = 'Filter'
