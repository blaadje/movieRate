import * as React from 'react'
import Svg from 'react-inlinesvg'

import * as checked from 'images/checked.svg'
import * as add from 'images/add.svg'
import * as infos from 'images/information.svg'

import Panel from 'components/Panel'
import Rate from 'components/Rate'
import Image from 'components/Image'
import Popper from 'components/Popper'

import Form from 'containers/Form'
import List from 'containers/List'
import MovieInfos from 'containers/MovieInfos'

import { API_IMAGE_LINK } from 'settings'

import './style.scss'

interface iProps {
  movie: any
}

interface iState {
  isHovered: Boolean
}

export default class MovieItem extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      isHovered: false
    }
  }
  render () {
    const { isHovered } = this.state
    const { movie } = this.props

    const collection = [
      {
        title: 'ma playlist'
      },
      {
        title: 'ma playlist2'
      }
    ]

    return (
      <Image
        filter
        className='Item-wrapper'
        src={API_IMAGE_LINK + movie.poster_path}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <div className='Item-description'>
          <span className='Item-description--title u-mgb--xs'>{movie.title || movie.name}</span>
          <span className='Item-description--date u-mgb--xs'>{`(${movie.release_date || movie.first_air_date})`}</span>
          <Rate
            rate={movie.vote_average}
          />
        </div>
        {isHovered &&
          <div className='ItemMenu-wrapper'>
            <div className='ItemMenu'>
              <Popper
                popperPlacement='right'
                targetComponent={
                  <div className='ItemMenu-options'>
                    <Svg className='Option-image' src={checked} />
                  </div>
                }
                popperComponent={ <Form movieId={movie.id} /> }
              />
              <Popper
                popperPlacement='right'
                targetComponent={
                  <div className='ItemMenu-options'>
                    <Svg className='Option-image' src={add} />
                  </div>
                }
                popperComponent={ <List collection={collection}/> }
              />
              <Panel
                onClickOutside={() => this.setState({ isHovered: false })}
                targetComponent={
                  <div className='ItemMenu-options'>
                    <Svg className='Option-image' src={infos} />
                  </div>
                }
                panelComponent={
                  <MovieInfos movie={movie} />
                }
              />
            </div>
          </div>
        }
      </Image >
    )
  }
}
