import Model from 'redux-orm'

import { insertResourceByType, TRENDING } from '@core/store/constants'

interface ActionProps {
  type: string
  relationShip?: string
}

export default class Trending extends Model<typeof Trending, TrendingItem> {
  static reducer({ type }: ActionProps, Trending: any) {
    switch (type) {
      case insertResourceByType(TRENDING):
        if (Trending.idExists(0)) {
          return
        }

        return Trending.create({ type: 'trending' })
    }
  }
}

export interface TrendingItem {
  type: string
}

Trending.modelName = 'Trending'
