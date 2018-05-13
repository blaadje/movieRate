import * as React from 'react'

import { Movie } from 'core/model'
import './style.scss'

interface iProps {
  movie: Movie
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
    return (
      <div className='MovieInfos-wrapper'>
        test1
      </div>
    )
  }
}
