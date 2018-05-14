import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import Svg from 'react-inlinesvg'

import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'
import Popper from 'components/Popper'

import * as vector from 'images/Vector.svg'
import './index.scss'
import { Movie } from 'core/model'
import { appplicationCall } from 'core/sagas/movieSaga/actions'

interface iProps {
  dispatch: (Object: any) => void,
  movies: Array<Movie>
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
      category: 'discover/modevie'
    }
  }

  componentWillMount () {
    this.fetch(this.state.category)
  }

  componentWillReceiveProps (props: iProps) {
    if (props.movies) {
      this.setState({ isLoading: false })
    }
  }

  fetch (category: string): void {
    this.props.dispatch(appplicationCall(category))
    this.setState({ category })
  }

  render (): React.ReactNode {
    const { isLoading, category } = this.state
    const { movies } = this.props

    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search inputClassName='Input-bold'/>
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
          <div>isLoading</div>
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
    // movies: state.Movies.result
  }
}

export default flow(
  connect(mapStateToProps)
)(Trends)
