import * as React from 'react'
import { spring, Motion } from 'react-motion'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Panel from '@components/Panel'
import Popper from '@components/Popper'
import RoundedButton from '@components/RoundedButton'
import Form from '@containers/Form'
import MovieInfos from '@containers/MovieInfos'

interface Iprops extends React.HTMLAttributes<any> {
  movie: any
  onUpdate?: (value: boolean) => void
}

const Wrapper: any = styled.div`
  cursor: ${({ isOpen }: any) => (isOpen ? 'pointer' : 'none')};
`

const Content: any = styled.div.attrs(({ opacity }: any) => ({
  style: { opacity },
}))`
  transition: all 0.2s ease;
  height: 100%;
  width: 100%;
  display: flex;
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

const Button = styled(Popper)`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.XS};
  }
`

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(18, 29, 43, 1) 0%,
    rgba(19, 39, 57, 0.8981967787114846) 27%,
    rgba(23, 96, 135, 0.10547969187675066) 100%,
    rgba(23, 96, 135, 0) 100%
  );
`

const OptionsLayer: React.FunctionComponent<Iprops> = ({
  movie,
  onUpdate,
  ...rest
}: Iprops) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const timer: any = React.useRef()

  const showDetailsWithTimer = () => {
    clearInterval(timer.current)
    if (!isOpen) {
      setIsOpen(true)
    }
    timer.current = setTimeout(() => setIsOpen(false), 3000)
  }

  React.useEffect(() => onUpdate && onUpdate(isOpen), [isOpen])

  React.useEffect(() => {
    showDetailsWithTimer()
    return () => clearInterval(timer.current)
  }, [])

  return (
    <Wrapper {...rest} isOpen={isOpen} onMouseMove={showDetailsWithTimer}>
      {isOpen && (
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
          {({ opacity }) => (
            <Content opacity={opacity}>
              <Gradient>
                <PaddedWrapper>
                  <ButtonsWrapper>
                    <Button
                      popperPlacement="right"
                      targetComponent={
                        <RoundedButton>
                          <StyledIcon glyph="checked" />
                        </RoundedButton>
                      }
                      popperComponent={<Form movieId={movie.id} />}
                    />
                    <Button
                      popperPlacement="right"
                      targetComponent={
                        <RoundedButton>
                          <StyledIcon glyph="playlist" />
                        </RoundedButton>
                      }
                      popperComponent={<p>test</p>}
                    />
                    <Panel
                      targetComponent={
                        <RoundedButton>
                          <StyledIcon glyph="infos" />
                        </RoundedButton>
                      }
                      panelComponent={<MovieInfos movie={movie} />}
                    />
                  </ButtonsWrapper>
                </PaddedWrapper>
              </Gradient>
            </Content>
          )}
        </Motion>
      )}
    </Wrapper>
  )
}

export default OptionsLayer
