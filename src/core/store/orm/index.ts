import { ORM } from 'redux-orm'

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
} from '@core/store/orm/resourcesModels'

const orm = new ORM({
  stateSelector: (state: any) => state.orm,
} as any) as any

orm.register(
  Movie,
  Rate,
  Playlist,
  Discover,
  Search,
  Filter,
  Tv,
  Trending,
  Genre
)

export default orm
