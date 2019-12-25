import * as React from 'react'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Panel from '@components/Panel'
import Popper from '@components/Popper'
import RoundedButton from '@components/RoundedButton'
import Form from '@containers/Form'
import MovieInfos from '@containers/MovieInfos'

interface Iprops extends React.HTMLAttributes<any> {
  movie: any
  isMuted: boolean
  onToggleMuted?: () => void
  onTogglePopper?: (value: boolean) => void
}

const Wrapper: any = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(18, 29, 43, 1) 0%,
    rgba(19, 39, 57, 0.8981967787114846) 27%,
    rgba(23, 96, 135, 0.10547969187675066) 100%,
    rgba(23, 96, 135, 0) 100%
  );
`

const PaddedWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.S};
`

const ButtonsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.S};
  position: absolute;
  bottom: 0;
  right: 0;
`

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
`

const StyledRoundedButton: any = styled(RoundedButton)`
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const OptionsLayer: React.FunctionComponent<Iprops> = ({
  movie,
  isMuted,
  onToggleMuted,
  onTogglePopper,
}: Iprops) => {
  const [isFormOpenned, setFormOpenned] = React.useState(false)
  const [isPlaylistOpenned, setPlaylistOpenned] = React.useState(false)
  const [isInfosOpenned, setInfosOpenned] = React.useState(false)

  const handleFormClick = () => {
    setFormOpenned(!isFormOpenned)
    setPlaylistOpenned(false)
    setInfosOpenned(false)
  }
  const handlePlaylistClick = () => {
    setPlaylistOpenned(!isPlaylistOpenned)
    setFormOpenned(false)
    setInfosOpenned(false)
  }

  const handleInfosClick = () => {
    setInfosOpenned(!isInfosOpenned)
    setFormOpenned(false)
    setPlaylistOpenned(false)
  }

  React.useEffect(() => {
    onTogglePopper &&
      onTogglePopper(isFormOpenned || isPlaylistOpenned || isInfosOpenned)
  }, [isFormOpenned, isPlaylistOpenned, isInfosOpenned])

  return (
    <Wrapper>
      <PaddedWrapper>
        <ButtonsWrapper>
          <StyledRoundedButton
            active={isMuted}
            onClick={() => {
              onToggleMuted && onToggleMuted()
              setPlaylistOpenned(false)
              setFormOpenned(false)
              setInfosOpenned(false)
            }}
          >
            <StyledIcon glyph="mute" />
          </StyledRoundedButton>
          <Popper
            onClick={handleFormClick}
            onClickOutside={handleFormClick}
            popperPlacement="right"
            targetComponent={
              <StyledRoundedButton>
                <StyledIcon glyph="checked" />
              </StyledRoundedButton>
            }
            popperComponent={<Form movieId={movie.id} />}
          />
          <Popper
            onClick={handlePlaylistClick}
            onClickOutside={handlePlaylistClick}
            popperPlacement="right"
            targetComponent={
              <StyledRoundedButton>
                <StyledIcon glyph="playlist" />
              </StyledRoundedButton>
            }
            popperComponent={<p>test</p>}
          />
          <Panel
            onClick={handleInfosClick}
            onClickOutside={handleInfosClick}
            targetComponent={
              <StyledRoundedButton>
                <StyledIcon glyph="infos" />
              </StyledRoundedButton>
            }
            panelComponent={<MovieInfos movie={movie} />}
          />
        </ButtonsWrapper>
      </PaddedWrapper>
    </Wrapper>
  )
}

export default OptionsLayer
