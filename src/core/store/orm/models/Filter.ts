import Model from 'redux-orm'

import { SET_FILTER } from '@core/store/constants'

interface ActionProps {
  type: string
  filter: number
  filterId: number
}

export default class Filter extends Model<typeof Filter, FilterItem> {
  static reducer({ type, filter, filterId }: ActionProps, Filter: any): any {
    switch (type) {
      case SET_FILTER:
        Filter.withId(filterId).update({ value: filter })
        return
    }
  }
}

export interface FilterItem {
  type: string
  value: string
}

Filter.modelName = 'Filter'
