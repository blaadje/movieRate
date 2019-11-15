import Model from 'redux-orm'

import { createResourceByType, DISCOVER } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Discover extends Model<typeof Discover, DiscoverItem> {
  static reducer({ relationShip, type }: ActionProps, Discover: any) {
    switch (type) {
      case createResourceByType(DISCOVER):
        Discover.create({ type: relationShip })
        return
    }
  }
}

export interface DiscoverItem {
  type: string
}

Discover.modelName = 'Discover'
