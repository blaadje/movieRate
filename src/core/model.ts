import { Category, Filter, Movie, Rate, Playlist } from 'core/models'
import { MovieState } from 'core/models/Movie'
import { ORMCommonState } from 'redux-orm'
import { CategoryState } from 'core/models/Category'
import { FilterState } from 'core/models/Filter'
import { RateState } from 'core/models/Rate'
import { PlaylistState } from 'core/models/Playlist'

export interface Action<P> {
  type: string
  payload: P
}

export interface ORMModels {
  Category: typeof Category,
  Filter: typeof Filter,
  Movie: typeof Movie,
  Rate: typeof Rate,
  Playlist: typeof Playlist
}

export interface ORMState extends ORMCommonState {
  Category: CategoryState,
  Filter: FilterState
  Movie: MovieState,
  Rate: RateState,
  Playlist: PlaylistState
}
