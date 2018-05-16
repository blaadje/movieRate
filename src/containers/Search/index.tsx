import * as React from 'react'
import { connect } from 'react-redux'
import { flow } from 'lodash'
import Svg from 'react-inlinesvg'

import Image from 'components/Image'

import * as search from 'images/search.svg'

import { appplicationCall } from 'core/sagas/applicationSaga/actions'
import { Movie } from 'core/model'
import { API_IMAGE_LINK } from 'settings'
import './style.scss'

interface iProps {
  className: string,
  dispatch: (Object: any) => void,
  inputClassName?: string
}

interface iState {
  movies: Array<Movie>
}

class Search extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      movies: []
    }
  }
  getMovie (event: React.ChangeEvent<any>): void {
    const value = event.target.value
    if (!value) {
      this.setState({ movies: null })
      return
    }
    this.props.dispatch(appplicationCall('search/multi',
      {
        args: `query=${event.target.value}`,
        callback: (response: Array<Movie>) => {
          this.setState({ movies: response })
        }
      }
    ))
  }

  render () {
    const { movies } = this.state
    return (
      <div className={`Search-wrapper ${this.props.className || ''}`}>
        <div className='Search-input'>
          <Svg className='Search-icon' src={search}></Svg>
          <input
            className={`${this.props.inputClassName} Input`}
            placeholder='Search movie'
            onChange={(event) => this.getMovie(event)}
          />
        </div>
        {movies &&
          <div className='Search-result'>
            <ul>
              {movies.map((movie, index) => {
                if (!movie.title) {
                  return
                }

                return (
                  <li key={index} className='SearchResult-item'>
                    {movie.title}
                    <Image
                      className='Item-image'
                      src={API_IMAGE_LINK + movie.poster_path}
                    />
                  </li>
                )
              })

              }
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default flow(
  connect()
)(Search)
