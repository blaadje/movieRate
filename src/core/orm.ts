import { ORM } from 'redux-orm'
import { Movie, Rate, Playlist } from 'core/models'

const orm = new ORM()
orm.register(Movie, Rate, Playlist)
export default orm