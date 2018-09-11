import { createSelector, SessionWithModels } from 'redux-orm'
import orm from 'core/orm'
import { ORMState } from 'core/model'

const dbStateSelector = (state: any) => state.Application

export const filteredMovies = createSelector<ORMState>(
  orm,
  dbStateSelector,
  (session: SessionWithModels<ORMState>) => {
    // return console.log(session.Filter.all().first())
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
