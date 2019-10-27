import { useEffect, useRef } from 'react'
import { ORM } from 'redux-orm'

import { Movie } from '@core/store/orm/models'
import {
  CATEGORIES_INITIAL,
  MOVIES_INITIAL,
} from '@core/store/orm/models/tests/mocks'

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

export function useDidUpdateEffect(fn: () => void, inputs: any) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) fn()
    else didMountRef.current = true
  }, inputs)
}
