import { Model, attr, TableState, ORMId } from 'redux-orm'

export default class Category extends Model<CategoryItems> {}

interface CategoryItems {
  type: string,
  page: number
}

export type CategoryState = TableState<CategoryItems & ORMId>

Category.modelName = 'Category'
Category.fields = {
  id: attr(),
  type: attr(),
  page: attr()
}
