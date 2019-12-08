import { fk, Model } from 'redux-orm'

import Movie from '@core/store/orm/resourcesModels/Movie'

export default class Playlist extends Model<typeof Playlist, PlaylistItem> {}

interface PlaylistItem {
  name: string
  movie: Movie
}

Playlist.modelName = 'Playlist'
Playlist.fields = {
  movie: fk('Movie'),
}
