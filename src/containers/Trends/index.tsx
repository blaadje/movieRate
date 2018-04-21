import * as React from 'react'

import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'

import * as tomb from 'images/tombraider.jpg'

import './index.scss'

export default class Trends extends React.Component {
  render () {
    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search />
          <span className='u-c--grey u-fl--r'>Categorie</span>
        </header>
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
      </div>
    )
  }
}
