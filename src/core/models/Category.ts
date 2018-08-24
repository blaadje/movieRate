import { Model, attr, many, TableState, ORMId } from 'redux-orm'
import { API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'
import { ORMState } from 'core/model'
import { MovieState } from 'core/models/Movie'

export default class Category extends Model<CategoryItems> {
  static reducer (action: any, Category: any): ORMState | undefined {
    switch (action.type) {
      case API_FETCH_SUCCESS:
        action.payload.map((item: MovieState) => Category.withId('0').movies.add(item))
        break
    }

    return undefined
  }
}

interface CategoryItems {
  type: string,
  page: number
}

export type CategoryState = TableState<CategoryItems & ORMId>

Category.modelName = 'Category'
Category.fields = {
  id: attr(),
  type: attr(),
  movies: many('Movie', 'categorys'),
  page: attr()
}
