import { ORM } from 'redux-orm'
import { Movie, Playlist, Rate } from 'core/models'

const orm = new ORM()
orm.register(Movie, Rate, Playlist)
export default orm
