import Model from 'redux-orm'

import { insertResourceByType, SEARCH } from '@core/store/constants'

interface ActionProps {
  type: string
  resourceValues: any
  relationShip?: string
}

export default class Search extends Model<typeof Search, SearchItem> {
  static reducer(
    { relationShip, resourceValues, type }: ActionProps,
    Search: any
  ) {
    switch (type) {
      case insertResourceByType(SEARCH):
        return Search.upsert({
          type: relationShip,
          query: resourceValues.query,
        })
    }
  }
}

export interface SearchItem {
  type: string
  query: string
}

Search.modelName = 'Search'
