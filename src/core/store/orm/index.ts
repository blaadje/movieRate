import { ORM } from 'redux-orm'

import {
  Discover,
  Filter,
  Movie,
  Playlist,
  Rate,
  Search,
  Tv,
} from '@core/store/orm/models'

const orm = new ORM({
  stateSelector: (state: any) => state.orm,
} as any) as any

orm.register(Movie, Rate, Playlist, Discover, Search, Filter, Tv)

export default orm
