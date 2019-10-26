import {
  Movie,
  Playlist,
  Rate,
  Discover,
  Filter,
  Tv,
} from 'core/store/orm/models'
import { ORM } from 'redux-orm'

const orm = new ORM({
  stateSelector: (state: any) => state.orm,
} as any) as any

orm.register(Movie, Rate, Playlist, Discover, Filter, Tv)

export default orm
