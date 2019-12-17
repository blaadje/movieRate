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
  onUpdate?: (value: boolean) => void
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

const Button = styled(Popper)`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.XS};
  }
`

const OptionsLayer: React.FunctionComponent<Iprops> = ({ movie }: Iprops) => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default OptionsLayer
