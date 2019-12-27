import { capitalize } from 'lodash'
import { fk, many, Model } from 'redux-orm'
import { MovieItem } from './Movie'

import { insertResourceByType, TV } from '@core/store/constants'

interface ActionProps {
  type: string
  item: any
  relationShip?: string
}

export default class Tv extends Model<typeof Tv, TvItem> {
  static reducer(
    { type, item, relationShip }: ActionProps,
    Tv: any,
    session: any
  ) {
    switch (type) {
      case insertResourceByType(TV):
        return Tv.upsert(
          relationShip
            ? {
                ...item,
                vote_average: Math.round(item.vote_average / 2),
                [`${relationShip}Id`]: session[capitalize(relationShip)].last()
                  .id,
              }
            : item
        )
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
  genre_ids: many({
    to: 'Genre',
    as: 'genres',
    relatedName: 'tvs',
  }),
}
