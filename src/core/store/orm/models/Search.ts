import Model from 'redux-orm'

import { createResourceByType, SEARCH } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Search extends Model<typeof Search, SearchItem> {
  static reducer({ relationShip, type }: ActionProps, Search: any) {
    switch (type) {
      case createResourceByType(SEARCH):
        Search.upsert({ type: relationShip })
        return
    }
  }
}

export interface SearchItem {
  type: string
}

Search.modelName = 'Search'
