import Model from 'redux-orm'

import { createResourceByType, TRENDING } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Trending extends Model<typeof Trending, TrendingItem> {
  static reducer({ relationShip, type }: ActionProps, Trending: any) {
    switch (type) {
      case createResourceByType(TRENDING):
        Trending.create({ type: relationShip })
        return
    }
  }
}

export interface TrendingItem {
  type: string
}

Trending.modelName = 'Trending'
