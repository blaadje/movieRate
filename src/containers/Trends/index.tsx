import * as React from 'react'

import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'

import * as tomb from 'images/tombraider.jpg'

import './index.scss'

interface iProps {}

interface iState {}

export default class Trends extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
  }
  render (): React.ReactNode {
    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search inputClassName='Input-bold'/>
          <span className='Trends-header--Category'>Categorie</span>
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
