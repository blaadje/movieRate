import { capitalize } from 'lodash'
import { fk, many, Model } from 'redux-orm'

import {
  allowedTypes,
  insertResourceByType,
  MOVIE,
} from '@core/store/constants'

interface ActionProps {
  type: string
  item: any
  relationShip?: string
}

export default class Movie extends Model<typeof Movie, MovieItem> {
  static reducer(
    { type, item, relationShip }: ActionProps,
    Movie: any,
    session: any
  ) {
    switch (type) {
      case insertResourceByType(MOVIE):
        const movieExist = Movie.idExists(item.id)

        if (movieExist) {
          return Movie.withId(item.id).update(item)
        }

        const fetchedMovie = {
          ...item,
          personal_vote: null,
          comment: '',
          vote_average: Math.round(item?.vote_average / 2),
        }

        Movie.create(
          relationShip
            ? {
                ...fetchedMovie,
                [`${relationShip}Id`]: session[capitalize(relationShip)]?.last()
                  ?.id,
              }
            : fetchedMovie
        )
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
