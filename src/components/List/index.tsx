import * as React from 'react'

import Loader from 'components/Loader'
import MovieItem from 'containers/MovieItem'
import './style.scss'

interface CollectionDatas {
  [title: string]: string
}

interface Iprops {
  collection: CollectionDatas[]
  direction?: string
  wrapperClass?: string
}

const List: React.SFC<Iprops> = (props: Iprops) => {
  const { collection, wrapperClass, direction } = props

  return (
    <div className={`List-wrapper ${wrapperClass ? wrapperClass : ''}`}>
      <div className={`List-content ${direction === 'row' ? 'isRow' : 'isColumn'}`}>
        {!collection &&
          <Loader />
        }
        {collection &&
          collection.map((movie: any, index: number) => {
            if (!movie.title) {
              return
            }
            return <MovieItem
              key={index}
              isRow={direction === 'row'}
              movie={movie}
            />
          })
        }
      </div>
    </div>
  )
}

List.defaultProps = {
  direction: 'row'
}

export default List
