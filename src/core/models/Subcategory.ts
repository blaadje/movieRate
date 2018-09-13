import { Category } from 'core/models'
import { fk } from 'redux-orm'

export default class Subcategory extends Category { }

Subcategory.modelName = 'Subcategory'

Subcategory.fields = {
  categoryId: fk({
    to: 'Category',
    as: 'category',
    relatedName: 'subcategories'
  } as any)
}
