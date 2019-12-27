import * as React from 'react'
import styled, { css } from 'styled-components'
import OptionsLayer from './OptionsLayer'

import Fadeout from '@components/Fadeout'
import Player from '@components/Player'
import { calculatePourcentageFromScale } from '@core/utils'

interface Iprops {
  movie: any
  parentScale: number
  movieLink: string
  onToggleLayerOpened: () => void
}

const StyledFadeout: any = styled(Fadeout)`
  ${({ parentScale }: any) => css`
    position: absolute;
    z-index: 4;
    transform: scale(${1 / parentScale});
    top: -${calculatePourcentageFromScale({ scale: parentScale, position: 'y' })}px;
    left: -${calculatePourcentageFromScale({ scale: parentScale, position: 'x' })}px;
    right: -${calculatePourcentageFromScale({ scale: parentScale, position: 'x' })}px;
    bottom: -${calculatePourcentageFromScale({ scale: parentScale, position: 'y' })}px;
  `}
`

const ContentLayer: React.FunctionComponent<Iprops> = ({
  movie,
  movieLink,
  parentScale,
  onToggleLayerOpened,
}) => {
  const [isMuted, setMuted] = React.useState(false)
  const [shouldFade, toggleFade] = React.useState(true)

  return (
    <>
      {movieLink && <Player url={movieLink} isMuted={isMuted} />}
      <StyledFadeout
        enable={shouldFade}
        parentScale={parentScale}
        onToggleFade={onToggleLayerOpened}
      >
        <OptionsLayer
          isMuted={isMuted}
          movie={movie}
          onTogglePopper={(value: boolean) => toggleFade(!value)}
          onToggleMuted={() => setMuted(!isMuted)}
        />
      </StyledFadeout>
    </>
  )
}

export default ContentLayer
