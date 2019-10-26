import Model from 'redux-orm'
import { DISCOVER, createResourceByType } from 'core/store/constants'

interface actionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Discover extends Model<typeof Discover, DiscoverItem> {
  static reducer({ relationShip, type }: actionProps, Discover: any) {
    switch (type) {
      case createResourceByType(DISCOVER):
        Discover.upsert({ type: relationShip })
        break
    }
  }
}

export interface DiscoverItem {
  type: string
}

Discover.modelName = 'Discover'
