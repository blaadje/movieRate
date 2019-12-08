import Model from 'redux-orm'

import { createResourceByType, DISCOVER } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Discover extends Model<typeof Discover> {
  static reducer({ type }: ActionProps, Discover: any) {
    switch (type) {
      case createResourceByType(DISCOVER):
        if (Discover.idExists(0)) {
          return
        }

        return Discover.create({ type: 'discover' })
    }
  }
}

Discover.modelName = 'Discover'
