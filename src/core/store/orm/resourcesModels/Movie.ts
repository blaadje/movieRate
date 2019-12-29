import { capitalize, result } from 'lodash'
import { fk, many, Model } from 'redux-orm'

import {
  allowedTypes,
  insertResourcesByType,
  insertResourceByType,
  MOVIE,
} from '@core/store/constants'

interface ActionProps {
  type: string
  result: any
  relationShip?: string
}

export default class Movie extends Model<typeof Movie, MovieItem> {
  static reducer(
    { type, result, relationShip }: ActionProps,
    Movie: any,
    session: any
  ) {
    switch (type) {
      case insertResourceByType(MOVIE):
        const movieExist = Movie.idExists(result.id)

        if (movieExist) {
          return Movie.withId(result.id).update(result)
        }

        const fetchedMovie = {
          ...result,
          personal_vote: null,
          comment: '',
          vote_average: Math.round(result?.vote_average / 2),
        }

        return Movie.create(
          relationShip
            ? {
                ...fetchedMovie,
                [`${relationShip}Id`]: session[capitalize(relationShip)]?.last()
                  ?.id,
              }
            : fetchedMovie
        )
      case insertResourcesByType(MOVIE):
        const createMovie = (fetchedMovie: any) => {
          const movie = {
            ...fetchedMovie,
            vote_average: Math.round(fetchedMovie.vote_average / 2),
          }

          Movie.upsert(
            relationShip
              ? {
                  ...movie,
                  [`${relationShip}Id`]: session[
                    capitalize(relationShip)
                  ].last().id,
                }
              : movie
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
  media_type: allowedTypes
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  comment: string
  personal_vote: number
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
  searchId: fk({
    to: 'Search',
    as: 'search',
    relatedName: 'movies',
  }),
  trendingId: fk({
    to: 'Trending',
    as: 'trending',
    relatedName: 'movies',
  }),
  genre_ids: many({
    to: 'Genre',
    as: 'genres',
    relatedName: 'movies',
  }),
}
