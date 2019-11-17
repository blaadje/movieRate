import { capitalize } from 'lodash'
import { fk, Model } from 'redux-orm'

import { createResourceByType, MOVIE } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Movie extends Model<typeof Movie, MovieItem> {
  static reducer(
    { type, result, relationShip }: ActionProps,
    Movie: any,
    session: any
  ) {
    switch (type) {
      case createResourceByType(MOVIE):
        const createMovie = (item: any) => {
          const relationShipId = session[capitalize(relationShip)].last().id

          Movie.upsert(
            relationShip
              ? {
                  ...item,
                  vote_average: Math.round(item.vote_average / 2),
                  [`${relationShip}Id`]: relationShipId,
                }
              : item
          )
        }

        return result.forEach(createMovie)
    }
  }
}

export interface MovieItem {
  id: number
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  discoverId: number
  trendingId: number
}

Movie.modelName = 'Movie'
Movie.fields = {
  discoverId: fk({
    to: 'Discover',
    as: 'discover',
    relatedName: 'movies',
  }),
  trendingId: fk({
    to: 'Trending',
    as: 'trending',
    relatedName: 'movies',
  }),
}
