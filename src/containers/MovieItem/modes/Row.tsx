import * as React from 'react'

import '../style/row.scss'

import Popper from 'components/Popper';
import Form from 'containers/Form';
import { API_IMAGE_LINK } from 'settings'
import Image from 'components/Image'
import MovieInfos from 'containers/MovieInfos';
import Rate from 'components/Rate';
import Panel from 'components/Panel';
import ButtonOption from 'components/ButtonOption';

interface iProps {
  movie: any,
  onHovered: (value: boolean) => void,
  isHovered: boolean
}

const RowItem: React.SFC<any> = (props: iProps) => {
  const { movie, onHovered, isHovered } = props
  return (
    <Image
      filter
      className='Item-wrapper isRow'
      src={API_IMAGE_LINK + movie.poster_path}
      onMouseEnter={() => onHovered(true)}
      onMouseLeave={() => onHovered(false)}
    >
      <div className='Item-description'>
        <span className='Item-description--title u-mgb--xs'>{movie.title || movie.name}</span>
        <span className='Item-description--date u-mgb--xs'>{`(${movie.release_date || movie.first_air_date})`}</span>
        <Rate
          rate={movie.vote_average}
        />
      </div>
      {isHovered &&
        <div className='ItemOptions-wrapper'>
          <div className='Item-options'>
            <Popper
              popperPlacement='right'
              targetComponent={
                <ButtonOption type='infos' />
              }
              popperComponent={<Form movieId={movie.id} />}
            />
            <Popper
              popperPlacement='right'
              targetComponent={
                <ButtonOption type='rate' />
              }
              popperComponent={<p>test</p>}
            />
            <Panel
              onClickOutside={() => this.setState({ isHovered: false })}
              targetComponent={
                <ButtonOption type='playlist' />
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

export default RowItem