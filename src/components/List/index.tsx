import React from 'react'

import { template } from '@babel/core'

interface CollectionDatas {
  [title: string]: string
}

interface TemplateType {
  (item: object, index: number): React.ElementType
}

interface Iprops {
  collection: CollectionDatas[]
  template: TemplateType
}

const List: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { collection } = props

  return (
    <ul>
      <li>
        {collection &&
          collection.map((item: any, index: number) => {
            return template(item, index)
          })}
      </li>
    </ul>
  )
}

export default List
