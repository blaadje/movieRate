import * as React from 'react'

import Image from 'components/Image'

import { Movie, TV } from 'core/model'
import './style.scss'
import { API_IMAGE_LINK, API_POSTER_LINK } from 'settings'

interface iProps {
  movie: Movie & TV
}

interface iState {
}

export default class MovieInfos extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {

    }
  }
  render () {
    const { movie } = this.props

    return (
      <div className='MovieInfos-wrapper'>
        <Image
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
          TEST
        </div>
      </div>
    )
  }
}
