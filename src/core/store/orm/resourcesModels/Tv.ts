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
        const tvExist = Tv.idExists(item.id)

        if (tvExist) {
          return Tv.withId(item.id).update(item)
        }

        const fetchedTv = {
          ...item,
          personal_vote: null,
          comment: '',
          vote_average: Math.round(item?.vote_average / 2),
        }

        Tv.create(
          relationShip
            ? {
                ...fetchedTv,
                [`${relationShip}Id`]: session[capitalize(relationShip)]?.last()
                  ?.id,
              }
            : fetchedTv
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
