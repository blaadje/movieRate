import Model from 'redux-orm'

export default class Genre extends Model<typeof Genre, GenreItem> {}

export interface GenreItem {
  name: string
  type: Array<any>
  id: number
}

Genre.modelName = 'Genre'
