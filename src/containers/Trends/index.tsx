import * as React from 'react'
import './index.scss'
import * as tomb from 'images/tombraider.jpg'
import MovieItem from 'components/MovieItem'

export default class Trends extends React.Component {
  render () {
    return (
      <div className='Movie-wrapper'>
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
        <MovieItem
          image={tomb}
          title='Pacific Rim'
          date='2018'
          rate={30}
        />
      </div>
    )
  }
}
