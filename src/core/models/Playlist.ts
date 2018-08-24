import { Model, fk, TableState, ORMId, attr } from 'redux-orm'
import Movie from 'core/models/Movie'

export default class Playlist extends Model<PlaylistItems> {}

interface PlaylistItems {
  name: string,
  movie: Movie
}

export type PlaylistState = TableState<PlaylistItems & ORMId>

Playlist.modelName = 'Playlist'
Playlist.fields = {
  title: attr(),
  movie: fk('Movie')
}
