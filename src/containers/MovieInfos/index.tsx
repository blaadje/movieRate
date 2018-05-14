import * as React from 'react'

import { connect } from 'react-redux'

import { flow } from 'lodash'

import Image from 'components/Image'

import { Movie, TV } from 'core/model'
import './style.scss'
import { API_IMAGE_LINK, API_POSTER_LINK } from 'settings'
import { appplicationCall } from 'core/sagas/applicationSaga/actions'

interface iProps {
  movie: Movie & TV,
  dispatch: (Object: any) => void,
}

interface iState {
  cast: Array<any>
}

class MovieInfos extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      cast: []
    }
  }
  componentWillMount () {
    this.props.dispatch(appplicationCall(
      `movie/${this.props.movie.id}/credits`,
      {
        callback: ({cast}: any) => {
          this.setState({ cast })
        }
      }
    ))
  }

  render () {
    const { movie } = this.props

    return (
      <div className='MovieInfos-wrapper'>
        <Image
          filter
          className='MovieInfos-header'
          src={API_POSTER_LINK + movie.backdrop_path}
        >
          <div className='MovieInfos-gradient'>
            <header className='u-mgb--l'>
              {movie.original_title || movie.name}
            </header>
            <div className='MovieInfos-overview'>
              <img
                className='Overview-image'
                src={API_IMAGE_LINK + movie.poster_path}
              />
              <div className='Overview-text u-mgl--xl'>
                <span>Overview</span>
                <p>
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </Image>
        <div className='MovieInfos-content'>
          <ul className='MovieInfosContent-actors'>
            {this.state.cast.map((actor, index) => {
              if (!actor.profile_path || index > 3) {
                return
              }

              return (
                <li className='MovieInfosContent-actor' key={index}>
                  <Image
                    filter
                    className='Actor-image'
                    src={API_IMAGE_LINK + actor.profile_path}
                  />
                  <div className='Actor-name'>
                    <div>{actor.name}</div>
                    <div>{actor.character}</div>
                  </div>
                </li>
              )
            })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default flow(
  connect()
)(MovieInfos)
