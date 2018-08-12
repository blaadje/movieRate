import * as React from 'react'


import './style.scss'
import MovieItem from 'containers/MovieItem'
import Loader from 'components/Loader'

interface collectionDatas {
  [title: string]: string
}

interface iProps {
  collection: collectionDatas[],
  direction?: string,
  wrapperClass?: string
}

const setDirection = (direction: iProps['direction']) => direction === 'row' ? 'isRow' : 'isColumn'

const List: React.SFC<iProps> = (props: iProps) => {
  const { collection, wrapperClass, direction } = props

  return (
    <div className={`List-wrapper ${wrapperClass ? wrapperClass : ''}`}>
      <div className={`List-content ${setDirection(direction)}`}>
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
