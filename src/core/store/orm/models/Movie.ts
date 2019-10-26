import { Model, fk } from 'redux-orm'
import { MOVIE, createResourceByType } from 'core/store/constants'

interface actionProps {
  type: string
  result: object[]
  relationShip?: string
}

export default class Movie extends Model<typeof Movie, MovieItem> {
  static reducer({ type, result, relationShip }: actionProps, Movie: any) {
    switch (type) {
      case createResourceByType(MOVIE):
        const createMovie = (item: object) =>
          Movie.create(
            relationShip ? { ...item, [`${relationShip}Id`]: 0 } : item
          )

        result.forEach(createMovie)
        break
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
