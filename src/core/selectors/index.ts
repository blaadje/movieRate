import { createSelector } from 'redux-orm'
import orm from 'core/orm'

const dbStateSelector = (state: any) => state.Application

export const filteredMovies = createSelector(
  orm,
  dbStateSelector,
  (session) => {
    return session.Movie.all().toModelArray().filter((item: any) => item.type === session.Filter.withId('0').category)
  }
)

export const searchMovieSelector = (state: any, searchName: any) => {
  const session = orm.session(dbStateSelector(state))

  return session.Movie.all().toModelArray().filter((movie: any) => {
    return movie.title.includes(searchName.toLowerCase())
  })

}

export const activeFilterSelector = (state: any, filterProp: any) => {
  const session = orm.session(dbStateSelector(state))

  return session.Filter.withId('0').category === filterProp
}
