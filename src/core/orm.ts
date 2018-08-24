import { Filter, Movie, Playlist, Rate, Category } from 'core/models'
import { ORM } from 'redux-orm'
import { ORMModels, ORMState } from 'core/model'

const orm = new ORM<ORMState>()
orm.register<ORMModels>(Movie, Rate, Playlist, Filter, Category)

export default orm
