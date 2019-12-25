import { linearGradient, rgba } from 'polished'
import * as React from 'react'
import styled, { css } from 'styled-components'

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
  ${({ theme }: any) =>
    css`
      width: 100%;
      height: 100%;
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      ${linearGradient({
        colorStops: [
          `${rgba(theme.colors.dark, 1)} 0%`,
          `${rgba(theme.colors.dark, 1)} 5%`,
          `${rgba(theme.colors.dark, 0.8)} 30%`,
          `${rgba(theme.colors.dark, 0.5)} 60%`,
          `${rgba(theme.colors.dark, 0.4)} 100%`,
          `${rgba(theme.colors.dark, 0)} 100%`,
        ],
        toDirection: 'to top',
        fallback: rgba(theme.colors.dark, 0),
      })}
    `}
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
            popperComponent={<Form movie={movie} />}
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
