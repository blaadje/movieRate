import React from 'react'
import styled from 'styled-components'
import YouTubePlayer from 'youtube-player'
interface Iprops extends React.HTMLAttributes<any> {
  url: string
  isMuted?: boolean
}

const Wrapper: any = styled.div`
  height: 100%;
  width: 100%;

  iframe {
    transition: opacity 1s ease;
    opacity: ${({ loaded }: any) => (loaded ? 1 : 0)};
  }
`

const Player: React.FunctionComponent<Iprops> = ({ url, isMuted }: Iprops) => {
  const playerElement: any = React.useRef()
  const [player, setPlayer]: any = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setPlayer(
      YouTubePlayer(playerElement.current, {
        videoId: url,
        height: '100%' as any,
        width: '100%' as any,
        playerVars: { autoplay: 1, controls: 0 },
      })
    )

    return () => playerElement.current.remove()
  }, [])

  React.useEffect(() => {
    player?.on('stateChange', () => setLoaded(true))
  }, [player])

  React.useEffect(() => {
    isMuted ? player?.mute() : player?.unMute()
  }, [isMuted])

  return (
    <Wrapper loaded={loaded}>
      <div ref={playerElement} />
    </Wrapper>
  )
}

export default Player
