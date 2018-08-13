import { ORM } from 'redux-orm'
import { Movie, Playlist, Rate, Filter } from 'core/models'

const orm = new ORM()
orm.register(Movie, Rate, Playlist, Filter)

export default orm
