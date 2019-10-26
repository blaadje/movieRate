import * as React from 'react'

import '../style/row.scss'

import ButtonOption from 'components/ButtonOption'
import Image from 'components/Image'
import Panel from 'components/Panel'
import Popper from 'components/Popper'
import Rate from 'components/Rate'
import Form from 'containers/Form'
import MovieInfos from 'containers/MovieInfos'
import { API_IMAGE_LINK } from 'settings'

interface Iprops {
  movie: any
  onHovered: (value: Boolean) => void
  isHovered: Boolean
}

const RowItem: React.SFC<Iprops> = (props: Iprops) => {
  const { movie, onHovered, isHovered } = props
  return (
    <Image
      filter={true}
      className="Item-wrapper isRow"
      src={API_IMAGE_LINK + movie.poster_path}
      onMouseEnter={() => onHovered(true)}
      onMouseLeave={() => onHovered(false)}
    >
      <div className="Item-description">
        <span className="Item-description--title u-mgb--xs">
          {movie.title || movie.name}
        </span>
        <span className="Item-description--date u-mgb--xs">{`(${movie.release_date ||
          movie.first_air_date})`}</span>
        <Rate rate={movie.vote_average} />
      </div>
      {isHovered && (
        <div className="ItemOptions-wrapper">
          <div className="Item-options">
            <Popper
              popperPlacement="right"
              targetComponent={<ButtonOption type="rate" />}
              popperComponent={<Form movieId={movie.id} />}
            />
            <Popper
              popperPlacement="right"
              targetComponent={<ButtonOption type="playlist" />}
              popperComponent={<p>test</p>}
            />
            <Panel
              onClickOutside={() => onHovered(false)}
              targetComponent={<ButtonOption type="infos" />}
              panelComponent={<MovieInfos movie={movie} />}
            />
          </div>
        </div>
      )}
    </Image>
  )
}

export default RowItem
