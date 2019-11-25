import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Image from '@components/Image'
import Panel from '@components/Panel'
import Popper from '@components/Popper'
import Rate from '@components/Rate'
import RoundedButton from '@components/RoundedButton'
import Form from '@containers/Form'
import MovieInfos from '@containers/MovieInfos'
import { API_IMAGE_LINK } from '@settings'

interface Iprops {
  movie: any
}

const Wrapper = styled(Image)`
  position: relative;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 0px 12px ${({ theme }) => rgba(theme.colors.dark, 0.8)};
  width: ${rem('160px')};
  height: ${rem('240px')};
  margin: ${rem('30px')};
`

const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;
  font-size: 17px;
  background: ${({ theme }) => rgba(theme.colors.black, 0.6)};
  span {
    display: block;
  }
`

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const OptionsWrapper: any = styled.div`
  display: ${({ isHovered }: any) => (isHovered ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => rgba(theme.colors.dark, 0.9)};
`

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
`

const Button = styled(Popper)`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.XS};
  }
`

const MovieBlock: React.FunctionComponent<Iprops> = ({ movie }) => {
  const [isHovered, setIsHover] = React.useState(false)

  return (
    <Wrapper
      filter={true}
      src={API_IMAGE_LINK + movie.poster_path}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Description>
        <Title>{movie.title || movie.name}</Title>
        <span>{movie.release_date || movie.first_air_date}</span>
        <Rate rate={movie.vote_average} />
      </Description>
      <OptionsWrapper isHovered={isHovered}>
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
          onClickOutside={() => setIsHover(false)}
          targetComponent={
            <RoundedButton>
              <StyledIcon glyph="infos" />
            </RoundedButton>
          }
          panelComponent={<MovieInfos movie={movie} />}
        />
      </OptionsWrapper>
    </Wrapper>
  )
}

export default MovieBlock
