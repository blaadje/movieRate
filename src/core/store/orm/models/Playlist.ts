import { Model, fk } from 'redux-orm'
import Movie from 'core/store/orm/models/Movie'

export default class Playlist extends Model<typeof Playlist, PlaylistItem> {}

interface PlaylistItem {
  name: string
  movie: Movie
}

Playlist.modelName = 'Playlist'
Playlist.fields = {
  movie: fk('Movie'),
}
