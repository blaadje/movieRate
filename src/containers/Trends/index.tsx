import * as React from 'react'
import { connect } from 'react-redux'

import { flow } from 'lodash'

import MovieItem from 'containers/MovieItem'
import Search from 'containers/Search'

import './index.scss'
import { Movie } from 'core/model'

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

  componentDidMount () {
    this.props.dispatch({ type: 'MOVIES_FETCH' })
  }

  componentWillReceiveProps (props: any) {
    if (props.movies) {
      this.setState({ isLoading: false })
    }
  }

  render (): React.ReactNode {
    const { isLoading } = this.state
    const { movies } = this.props

    const imageLink = 'https://image.tmdb.org/t/p/w500'
    return (
      <div className='Trends-wrapper'>
        <header className='Trends-header'>
          <Search inputClassName='Input-bold'/>
          <span className='Trends-header--Category'>Categorie</span>
        </header>
        {isLoading &&
          <div>isLoading</div>
        }
        {!isLoading &&
          <div className='Movie-wrapper'>
            {movies.map((item: any, key: number) => {
              return <MovieItem
                key={key}
                image={imageLink + item.poster_path}
                title={item.title}
                date={item.release_date}
                rate={30}
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
