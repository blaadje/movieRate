import * as React from 'react'
import { spring, Motion } from 'react-motion'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

interface Iprops extends React.HTMLAttributes<any> {
  url: string
}

const StyledPlayer = styled(ReactPlayer).attrs(({ opacity }) => ({
  style: { opacity },
}))`
  transition: all 0.5s ease;
`

const Player: React.FunctionComponent<Iprops> = ({ url }: Iprops) => {
  return (
    <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
      {({ opacity }) => (
        <StyledPlayer
          muted={true}
          opacity={opacity}
          width="100%"
          height="100%"
          url={url}
          playing={true}
        />
      )}
    </Motion>
  )
}

export default Player
