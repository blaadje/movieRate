import { Discover, Movie, Rate, Playlist, Filter, Tv } from './models'

export interface Action<P> {
  type: string
  payload: P
}

export interface ORMModels {
  Discover: typeof Discover
  Filter: typeof Filter
  Movie: typeof Movie
  Rate: typeof Rate
  Playlist: typeof Playlist
  Tv: typeof Tv
}

export interface ORMState {
  Filter: Filter
  Discover: Discover
  Tv: Tv
  Movie: Movie
  Rate: Rate
  Playlist: Playlist
}
