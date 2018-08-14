import { Filter, Movie, Playlist, Rate } from 'core/models'
import { ORM } from 'redux-orm'

const orm = new ORM()
orm.register(Movie, Rate, Playlist, Filter)

export default orm
