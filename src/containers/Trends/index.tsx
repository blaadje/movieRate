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
import { API_IMAGE_LINK } from 'settings'

interface iProps {
  dispatch: (Object: any) => void,
  movies: Array<Movie>
}

interface iState {
  isLoading: boolean
}

class Trends extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentWillMount () {
    this.props.dispatch({ type: 'MOVIES_FETCH',
      query: 'discover/movie'
    })
  }

  componentWillReceiveProps (props: iProps) {
    if (props.movies) {
      this.setState({ isLoading: false })
    }
  }

  render (): React.ReactNode {
    const { isLoading } = this.state
    const { movies } = this.props

    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search inputClassName='Input-bold'/>
          <Popper
            popperPlacement='bottom'
            wrapperClass='Trends-header--Category'
            targetComponent={
              <div>
                <span>Category</span>
                <Svg className='u-mgl--s' src={vector} />
              </div>
            }
            popperComponent={
              <ul>
                <li>Popular movies</li>
                <li>Last movies</li>
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
                image={API_IMAGE_LINK + item.poster_path}
                title={item.title}
                date={item.release_date}
                rate={item.vote_average}
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
