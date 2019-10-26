import { ORM } from 'redux-orm'
import {
  MOVIES_INITIAL,
  CATEGORIES_INITIAL,
} from 'core/store/orm/models/tests/mocks'
import { Movie } from 'core/store/orm/models'

export function createTestORM() {
  const orm = new ORM()
  orm.register(Movie)
  return orm
}

export function createTestSessionWithData(customORM?: any) {
  const orm = customORM || createTestORM()
  const state = orm.getEmptyState()
  const { Movie, Category } = orm.mutableSession(state)

  MOVIES_INITIAL.forEach(props => Movie.create(props))
  CATEGORIES_INITIAL.forEach(props => Category.create(props))

  const normalSession = orm.session(state)
  return { session: normalSession, orm, state }
}
