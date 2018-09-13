import { Filter, Movie, Playlist, Rate, Category, Subcategory } from 'core/models'
import { ORM } from 'redux-orm'
import { ORMModels, ORMState } from 'core/model'

const orm = new ORM<ORMState>()
orm.register<ORMModels>(Movie, Rate, Playlist, Filter, Category, Subcategory)

export default orm
