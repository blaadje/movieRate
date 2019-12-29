import { darken, linearGradient, rgba } from 'polished'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import Image from '@components/Image'
import Rate from '@components/Rate'
import { resourceFetchAction } from '@core/store/actions'
import { allowedTypes, VIDEO } from '@core/store/constants'
import { movieVideos } from '@core/store/selectors'
import { calculatePourcentageFromScale, sleep, useDebounce } from '@core/utils'
import { API_IMAGE_LINK } from '@settings'

import ContentLayer from './components/ContentLayer'

interface Iprops extends React.HTMLAttributes<any> {
  movie: any
  videos?: []
  filterId: number
  resourceType: allowedTypes
  onMouseEnter?: () => void
}

const scale: number = 1.3

const Wrapper: any = styled(Image)`
  position: relative;
  display: flex;
  flex-direction: row;
  width: ${rem('340px')};
  height: ${rem('191px')};
  margin: ${({ theme }) => theme.spacing.XS};
  transform: scale(1);
  transition: transform 0.5s ease;
  cursor: pointer;
  z-index: 1;
  ${({ isHovered }: any) =>
    isHovered &&
    css`
      z-index: 15;
      box-shadow: ${({ theme }) => theme.boxShadow(0.2)};
      transform: scale(${scale});
      .description {
        transform: scale(${1 / scale})
          translateX(
            -${calculatePourcentageFromScale({ scale, position: 'x' })}px
          );
        opacity: ${({ isOptionsLayerOpened }: any) =>
          isOptionsLayerOpened ? 1 : 0};
      }
    `}
`

const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: bottom;
  z-index: 10;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.S};
  font-size: 17px;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 1;
`

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const Date = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const Gradient: any = styled.div`
  ${({ theme, isRated }: any) =>
    css`
      border: ${isRated
        ? `6px solid ${rgba(theme.colors.highlight, 0.3)}`
        : 'none'}};
      width: 100%;
      height: 100%;
      ${linearGradient({
        colorStops: [
          `${rgba(darken(0.02, theme.colors.dark), 1)} 0%`,
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

const MovieBlock: React.FunctionComponent<Iprops> = (
  { movie, onMouseEnter, videos },
  ...rest
) => {
  const [isHovered, setIsHover] = React.useState(false)
  const [isOptionsLayerOpened, setOptionsLayerOpened] = React.useState(true)

  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter()
    setIsHover(true)
  }

  const debouncedHandleMouseEnter =
    onMouseEnter && useDebounce(handleMouseEnter, 300)

  const handleMouseLeave = () => {
    setIsHover(false)
    debouncedHandleMouseEnter?.cancel()
  }

  const curentMovie: any = videos?.[movie.id]?.[0]
  const movieLink = curentMovie && curentMovie.key
  const isRated = Boolean(movie.personal_vote || movie.comment)

  return (
    <Wrapper
      src={API_IMAGE_LINK + (movie.backdrop_path || movie.poster_path)}
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHovered={isHovered}
      isOptionsLayerOpened={isOptionsLayerOpened}
      {...rest}
    >
      <Gradient isRated={isRated}>
        <Description className="description">
          <Title>{movie.original_title || movie.name}</Title>
          <Date>{movie.release_date || movie.first_air_date}</Date>
          <Rate rate={movie.vote_average} />
        </Description>
        {isHovered && (
          <ContentLayer
            parentScale={scale}
            movie={movie}
            movieLink={movieLink}
            onToggleLayerOpened={() =>
              setOptionsLayerOpened(!isOptionsLayerOpened)
            }
          />
        )}
      </Gradient>
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
      resourceFetchAction(resourceType, {
        createResource: false,
        resourceId: movie.id,
        relationShip: VIDEO,
      })
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieBlock)
