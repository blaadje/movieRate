import { Model, attr, fk } from 'redux-orm'

export default class Playlist extends Model<any> {}

Playlist.modelName = 'Playlist'
Playlist.fields = {
  movie: fk('Movie')
}
