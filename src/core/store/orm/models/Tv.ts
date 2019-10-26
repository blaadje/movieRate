import { Model, fk } from 'redux-orm'
import { TV, createResourceByType } from 'core/store/constants'
import { MovieItem } from './Movie'

interface actionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Tv extends Model<typeof Tv, TvItem> {
  static reducer({ type, result, relationShip }: actionProps, Tv: any) {
    switch (type) {
      case createResourceByType(TV):
        const createTv = (item: object) =>
          Tv.create(relationShip ? { ...item, [`${relationShip}Id`]: 1 } : item)

        result.forEach(createTv)
        break
    }
  }
}

export interface TvItem extends MovieItem {}

Tv.modelName = 'Tv'
Tv.fields = {
  discoverId: fk({
    to: 'Discover',
    as: 'discover',
    relatedName: 'tvs',
  }),
}
