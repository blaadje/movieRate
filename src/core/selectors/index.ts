import { createSelector } from 'redux-orm'
import orm from 'core/orm'

const dbStateSelector = (state: any) => state.Application

const movieSelector = createSelector(
  orm,
  dbStateSelector,
  session => {
    return session.Movie.all().toModelArray()
  }
)

export default movieSelector