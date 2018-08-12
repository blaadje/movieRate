import * as React from 'react'

import '../style/column.scss'
import Popper from 'components/Popper';
import Form from 'containers/Form';
import { API_IMAGE_LINK } from 'settings'
import Image from 'components/Image'
import MovieInfos from 'containers/MovieInfos';
import Rate from 'components/Rate';
import Panel from 'components/Panel';
import ButtonOption from 'components/ButtonOption';

interface iProps {
  movie: any
}

const ColumnItem: React.SFC<any> = (props: iProps) => {
  const { movie } = props
  return (
    <div
      className='Item-wrapper isColumn' 
    >
      <Image
        className='Item-image'
        src={API_IMAGE_LINK + movie.poster_path}
      />
      <div className='ItemContent-wrapper'>
        <div className='Item-description'>
          <div>{movie.title}</div>
          <div>{movie.release_date}</div>
          <Rate
            rate={movie.vote_average}
          />
        </div>
        <div className='Item-options'>
          <Panel
            targetComponent={
              <ButtonOption type='infos' />
            }
            panelComponent={
              <MovieInfos movie={movie} />
            }
          />
          <Popper
            popperPlacement='right'
            targetComponent={
              <ButtonOption type='rate' />
            }
            popperComponent={<Form movieId={movie.id} />}
          />
          <Popper
            popperPlacement='right'
            targetComponent={
              <ButtonOption type='playlist' />
            }
            popperComponent={<p>test</p>}
          />
        </div>
      </div>
    </div>
  )
}

export default ColumnItem