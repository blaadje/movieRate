import { capitalize } from 'lodash'
import { fk, Model } from 'redux-orm'
import { MovieItem } from './Movie'

import { createResourceByType, TV } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Tv extends Model<typeof Tv, TvItem> {
  static reducer(
    { type, result, relationShip }: ActionProps,
    Tv: any,
    session: any
  ) {
    switch (type) {
      case createResourceByType(TV):
        const createTv = (item: any) =>
          Tv.upsert(
            relationShip
              ? {
                  ...item,
                  vote_average: Math.round(item.vote_average / 2),
                  [`${relationShip}Id`]: session[
                    capitalize(relationShip)
                  ].last().id,
                }
              : item
          )

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
  trendingId: fk({
    to: 'Trending',
    as: 'trending',
    relatedName: 'tvs',
  }),
}
