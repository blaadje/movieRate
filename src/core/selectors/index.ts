import { createSelector, SessionWithModels } from 'redux-orm'
import orm from 'core/orm'
import { ORMState } from 'core/model'

const dbStateSelector = (state: any) => state.Application

export const filteredMovies = createSelector<ORMState>(
  orm,
  dbStateSelector,
  (session: SessionWithModels<ORMState>) => {
    let movies = null
    session.Category.all().toModelArray().map((item: any) => {
      if (item.type === session.Filter.all().first().category) {
        movies = item.movies.all().toRefArray()
      }
    })
    return movies
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
