import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import { spring, Motion } from 'react-motion'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import Icon from '@components/Icon'
import Image from '@components/Image'
import Panel from '@components/Panel'
import Popper from '@components/Popper'
import Rate from '@components/Rate'
import RoundedButton from '@components/RoundedButton'
import Form from '@containers/Form'
import MovieInfos from '@containers/MovieInfos'
import { resourceFetchAction } from '@core/store/actions'
import { VIDEO } from '@core/store/constants'
import { movieVideos } from '@core/store/selectors'
import { sleep, useDebounce } from '@core/utils'
import { API_IMAGE_LINK } from '@settings'

interface Iprops extends React.HTMLAttributes<any> {
  movie: any
  videos?: []
  filterId: number
  resourceType: string
  onMouseEnter?: () => void
}

const Wrapper: any = styled(Image)`
  position: relative;
  display: flex;
  flex-direction: row;
  width: ${rem('340px')};
  height: ${rem('191px')};
  margin: ${({ theme }) => theme.spacing.XS};
  transform: scale(1);
  transition: all 0.5s ease;
  cursor: pointer;
  ${({ isHovered }: any) =>
    isHovered &&
    css`
      z-index: 5;
      transform: scale(1.4);
    `}
`

const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;
  font-size: 17px;
  background: ${({ theme }) => rgba(theme.colors.black, 0.3)};
  span {
    display: block;
  }
`

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const Date = styled.span`
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const OptionsWrapper: any = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
`

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
`

const Button = styled(Popper)`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.XS};
  }
`

const Content = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const StyledPlayer = styled(ReactPlayer).attrs(({ opacity }) => ({
  style: { opacity },
}))`
  transition: all 0.5s ease;
`

const MovieBlock: React.FunctionComponent<Iprops> = (
  { movie, onMouseEnter, videos },
  ...rest
) => {
  const [isHovered, setIsHover] = React.useState(false)
  const [showPlayer, setShowPlayer] = React.useState(false)

  const handleMouseEnter = async () => {
    onMouseEnter && onMouseEnter()
    setIsHover(true)
    await sleep(500)
    setShowPlayer(true)
  }

  const debouncedHandleMouseEnter =
    onMouseEnter && useDebounce(handleMouseEnter, 100)

  const handleMouseLeave = () => {
    setIsHover(false)
    debouncedHandleMouseEnter?.cancel()
    setShowPlayer(false)
  }

  const curentMovie: any = videos?.[movie.id]?.[0]
  const movieLink = curentMovie && `https://youtu.be/${curentMovie.key}`

  return (
    <Wrapper
      filter={true}
      src={API_IMAGE_LINK + (movie.backdrop_path || movie.poster_path)}
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHovered={isHovered}
      {...rest}
    >
      <Description>
        <Title>{movie.original_title || movie.name}</Title>
        <Date>{movie.release_date || movie.first_air_date}</Date>
        <Rate rate={movie.vote_average} />
      </Description>
      <OptionsWrapper isHovered={isHovered} movieLink={movieLink || false}>
        {isHovered && (
          <>
            {showPlayer && movieLink && (
              <Motion
                defaultStyle={{ opacity: 0 }}
                style={{ opacity: spring(1) }}
              >
                {({ opacity }) => (
                  <StyledPlayer
                    opacity={opacity}
                    width="100%"
                    height="100%"
                    url={movieLink}
                    playing={true}
                  />
                )}
              </Motion>
            )}
            <Content>
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
            </Content>
          </>
        )}
      </OptionsWrapper>
    </Wrapper>
  )
}

const mapStateToProps = (state: any, { filterId }: Iprops) => {
  return {
    videos: movieVideos(state, filterId),
  }
}

const mapDispatchToProps = (
  dispatch: any,
  { movie, resourceType }: Iprops
) => ({
  onMouseEnter: () =>
    dispatch(
      resourceFetchAction({
        createResource: false,
        resourceType: resourceType,
        resourceId: movie.id,
        relationShip: VIDEO,
      })
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieBlock)
