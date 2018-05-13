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
      category: 'movie'
    }
  }

  componentWillMount () {
    this.props.dispatch({ type: 'MOVIES_FETCH',
      query: `discover/${this.state.category}`
    })
  }

  componentWillReceiveProps (props: iProps) {
    if (props.movies) {
      this.setState({ isLoading: false })
    }
  }

  fetch (category: string): void {
    this.props.dispatch({
      type: 'MOVIES_FETCH',
      query: `discover/${category}`
    })
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
                <span>Category</span>
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <ul className='HeaderCategory-wrapper'>
                <li
                  className={`${category === 'movie' ? 'isSelected' : ''} HeaderCategory-item u-mgb--m`}
                  onClick={() => this.fetch('movie')}
                >Popular movies</li>
                <li
                  className={`${category === 'tv' ? 'isSelected' : ''} HeaderCategory-item`}
                  onClick={() => this.fetch('tv')}
                >Popular TV shows</li>
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
    movies: state.Movies.result
  }
}

export default flow(
  connect(mapStateToProps)
)(Trends)
