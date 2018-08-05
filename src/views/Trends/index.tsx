import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Svg from 'react-inlinesvg'

import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'
import Popper from 'components/Popper'

import * as vector from 'images/Vector.svg'
import './index.scss'
import { apiFetch } from 'core/sagas/apiCallSaga/actions'
import Loader from 'components/Loader'

interface iProps {
  dispatch: (Object: any) => void,
  movies: any
}

interface iState {
  isLoading: boolean,
  category: string
}

class Trends extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      isLoading: true,
      category: 'discover/movie'
    }
  }

  componentWillMount () {
    this.fetch(this.state.category)
  }

  componentWillReceiveProps (props: iProps): any {
    return props
  }

  fetch (category: string): void {
    this.setState({ category })
    this.props.dispatch(apiFetch(category, {
      callback: (error: Error) => {
        if (error) {
          return
        }
        this.setState({ isLoading: false })
      }
    }))
  }

  render (): React.ReactNode {
    const { isLoading, category } = this.state
    const movies = this.props.movies[category]

    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search
            className='TrendsHeader-search'
            inputClassName='Input-bold'
          />
          <Popper
            popperPlacement='bottom'
            wrapperClass='TrendsHeader-Category'
            targetComponent={
              <div>
                <span>{category}</span>
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <ul className='HeaderCategory-wrapper'>
                <li
                  className={`${category === 'discover/movie' ? 'isSelected' : ''} HeaderCategory-item u-mgb--m`}
                  onClick={() => this.fetch('discover/movie')}
                >Popular movies</li>
                <li
                  className={`${category === 'discover/tv' ? 'isSelected' : ''} HeaderCategory-item u-mgb--m`}
                  onClick={() => this.fetch('discover/tv')}
                >Popular TV shows</li>
                <li
                  className={`${category === 'movie/now_playing' ? 'isSelected' : ''} HeaderCategory-item`}
                  onClick={() => this.fetch('movie/now_playing')}
                >Now playing</li>
              </ul>
            }
          />
        </header>
        {isLoading &&
          <Loader />
        }
        {!isLoading &&
          <div className='Movie-wrapper'>
            {movies.map((item: any, key: number) => {
              return <MovieItem
                key={key}
                movie={item}
              />
            })}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: state.movies
  }
}

export default flow(
  connect(mapStateToProps)
)(Trends)
