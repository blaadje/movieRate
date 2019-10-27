import { fk, Model } from 'redux-orm'

import { createResourceByType, MOVIE } from '@core/store/constants'

interface ActionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Movie extends Model<typeof Movie, MovieItem> {
  static reducer({ type, result, relationShip }: ActionProps, Movie: any) {
    switch (type) {
      case createResourceByType(MOVIE):
        const createMovie = (item: object) =>
          Movie.create(
            relationShip ? { ...item, [`${relationShip}Id`]: 0 } : item
          )

        result.forEach(createMovie)
        return
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
}

Movie.modelName = 'Movie'
Movie.fields = {
  discoverId: fk({
    to: 'Discover',
    as: 'discover',
    relatedName: 'movies',
  }),
}
