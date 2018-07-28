import * as React from 'react'
import { connect } from 'react-redux'
import { flow } from 'lodash'
import Svg from 'react-inlinesvg'

import Image from 'components/Image'
import * as checked from 'images/checked.svg'
import * as add from 'images/add.svg'
import * as infos from 'images/information.svg'

import * as search from 'images/search.svg'

import { appplicationCall } from 'core/sagas/applicationSaga/actions'
import { Movie } from 'core/model'
import { API_IMAGE_LINK } from 'settings'
import './style.scss'
import Rate from 'components/Rate'
import MovieInfos from 'containers/MovieInfos'
import Panel from 'components/Panel'
import Popper from 'components/Popper'
import Form from 'containers/Form'
import List from 'containers/List'

interface iProps {
  className: string,
  dispatch: (Object: any) => void,
  inputClassName?: string
}

interface iState {
  movies: Array<Movie>,
  inputValue: string
}

class Search extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      movies: [],
      inputValue: null
    }
  }
  getMovie (event: React.ChangeEvent<any>): void {
    this.setState({ inputValue: event.target.value })
    if (!event.target.value) {
      this.setState({ movies: [] })
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
    const { movies, inputValue } = this.state

    const collection = [
      {
        title: 'ma playlist'
      },
      {
        title: 'ma playlist2'
      }
    ]

    return (
      <div className={`Search-wrapper ${this.props.className || ''}`}>
        <div className='Search-input'>
          <Svg className='Search-icon' src={search} />
          <input
            className={`${this.props.inputClassName} Input`}
            placeholder='Search movie'
            onChange={(event) => this.getMovie(event)}
          />
        </div>
        {movies &&
          <div className='Search-result'>
            {(!movies.length && inputValue && inputValue.length > 2) &&
              <p className='u-pd--m'>No result found.</p>
            }
            <ul>
              {movies.map((movie, index) => {
                if (!movie.title) {
                  return
                }

                return (
                  <li key={index} className='SearchResult-item'>
                    <Image
                      className='SearchResultItem-image'
                      src={API_IMAGE_LINK + movie.poster_path}
                    />
                    <div className='SearchResultItemContent-wrapper'>
                      <div className='SearchResultItem-content'>
                        <div>{movie.title}</div>
                        <div>{movie.release_date}</div>
                        <Rate
                          rate={movie.vote_average}
                        />
                      </div>
                      <div className='SearchResultItem-options'>
                        <Panel
                          targetComponent={
                            <div className='ItemMenu-options'>
                              <Svg className='Option-image' src={infos} />
                            </div>
                          }
                          panelComponent={
                            <MovieInfos movie={movie} />
                          }
                        />
                        <Popper
                          popperPlacement='right'
                          targetComponent={
                            <div className='ItemMenu-options'>
                              <Svg className='Option-image' src={checked} />
                            </div>
                          }
                          popperComponent={<Form />}
                        />
                        <Popper
                          popperPlacement='right'
                          targetComponent={
                            <div className='ItemMenu-options'>
                              <Svg className='Option-image' src={add} />
                            </div>
                          }
                          popperComponent={<List collection={collection} />}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
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
