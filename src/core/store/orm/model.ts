import {
  Discover,
  Filter,
  Genre,
  Movie,
  Playlist,
  Rate,
  Search,
  Trending,
  Tv,
} from './resourcesModels'

export interface Action<P> {
  type: string
  payload: P
}

export interface ORMModels {
  Discover: typeof Discover
  Filter: typeof Filter
  Movie: typeof Movie
  Search: typeof Search
  Rate: typeof Rate
  Playlist: typeof Playlist
  Tv: typeof Tv
  Trending: typeof Trending
  Genre: typeof Genre
}

export interface ORMState {
  Filter: Filter
  Discover: Discover
  Tv: Tv
  Movie: Movie
  Search: Search
  Rate: Rate
  Playlist: Playlist
  Trending: Trending
  Genre: Genre
}
