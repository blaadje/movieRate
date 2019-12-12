import { capitalize } from 'lodash'
import { fk, many, Model } from 'redux-orm'

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
        const createMovie = (fetchedMovie: any) => {
          const relationShipId = session[capitalize(relationShip)].last().id
          const item = {
            ...fetchedMovie,
            vote_average: Math.round(fetchedMovie.vote_average / 2),
          }

          Movie.upsert(
            relationShip
              ? {
                  ...item,
                  [`${relationShip}Id`]: relationShipId,
                }
              : item
          )
        }

        return result.forEach(createMovie)
    }
  }

  static withGenres(genres: object[]) {
    return this.all()
      .toModelArray()
      .filter((item: any) =>
        item.genres
          .toRefArray()
          .some((item: any) => genres.some((genre: any) => genre === item.id))
      )
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
