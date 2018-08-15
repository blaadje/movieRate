import { createSelector } from 'redux-orm'
import orm from 'core/orm'

const dbStateSelector = (state: any) => state.Application

export const moviesSelector = createSelector(
  orm,
  dbStateSelector,
  (session) => {
    return session.Movie.all().toModelArray()
  }
)

export const searchMovieSelector = (state: any, searchName: any) => {
  const session = orm.session(dbStateSelector(state))

  return session.Movie.all().toModelArray().filter((movie: any) => {
    return movie.title.includes(searchName.toLowerCase())
  })

}
