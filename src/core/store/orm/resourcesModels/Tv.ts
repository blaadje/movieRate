import { capitalize } from 'lodash'
import { fk, many, Model } from 'redux-orm'
import { MovieItem } from './Movie'

import {
  insertResourcesByType,
  insertResourceByType,
  TV,
} from '@core/store/constants'

interface ActionProps {
  type: string
  result: any
  relationShip?: string
}

export default class Tv extends Model<typeof Tv, TvItem> {
  static reducer(
    { type, result, relationShip }: ActionProps,
    Tv: any,
    session: any
  ) {
    switch (type) {
      case insertResourceByType(TV):
        const tvExist = Tv.idExists(result.id)

        if (tvExist) {
          return Tv.withId(result.id).update(result)
        }

        const fetchedTv = {
          ...result,
          personal_vote: null,
          comment: '',
          vote_average: Math.round(result?.vote_average / 2),
        }

        return Tv.create(
          relationShip
            ? {
                ...fetchedTv,
                [`${relationShip}Id`]: session[capitalize(relationShip)]?.last()
                  ?.id,
              }
            : fetchedTv
        )
      case insertResourcesByType(TV):
        const createTv = (fetchedTv: any) => {
          const tv = {
            ...fetchedTv,
            vote_average: Math.round(fetchedTv.vote_average / 2),
          }

          Tv.upsert(
            relationShip
              ? {
                  ...tv,
                  [`${relationShip}Id`]: session[
                    capitalize(relationShip)
                  ].last().id,
                }
              : tv
          )
        }

        return result.forEach(createTv)
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
