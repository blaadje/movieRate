import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Image from '@components/Image'
import Rate from '@components/Rate'
import { API_IMAGE_LINK, API_POSTER_LINK } from '@settings'

interface Iprops {
  movie: any
  dispatch: (Object: any) => void
}

const Gradient = styled.div`
  padding: 2em 1.8em;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => rgba(theme.colors.dark, 0)} 0%,
    ${({ theme }) => rgba(theme.colors.dark, 0.5)} 21%,
    ${({ theme }) => rgba(theme.colors.dark, 0.51)} 22%,
    ${({ theme }) => rgba(theme.colors.dark, 1)} 87%
  );
`

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.XXL};
`

const Thumbnail = styled(Image)`
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing.XL};
  width: ${rem('160px')};
  height: ${rem('240px')};
`

const Overview = styled.div`
  display: flex;
  align-items: center;
`

const MovieInfos: React.FunctionComponent<Iprops> = ({ movie }: Iprops) => {
  React.useEffect((): any => {
    // dispatch(resourceFetch(`movie/${this.props.movie.id}/credits`))
  }, [])

  return (
    <>
      <Image
        loader={false}
        filter={true}
        src={API_POSTER_LINK + movie.backdrop_path}
      >
        <Gradient>
          <Header>
            <h1>{movie.original_title || movie.name}</h1>
            <Rate rate={movie.vote_average} />
          </Header>
          <Overview>
            <Thumbnail src={API_IMAGE_LINK + movie.poster_path} />
            <div>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </Overview>
        </Gradient>
      </Image>
      <div>
        <ul>
          {/* {cast.map((actor, index) => {
            if (!actor.profile_path || index > 3) {
              return
            }

            return (
              <li className="MovieInfosContent-actor" key={index}>
                <Image
                  filter={true}
                  className="Actor-image"
                  src={API_IMAGE_LINK + actor.profile_path}
                />
                <div className="Actor-name">
                  <div>{actor.name}</div>
                  <div>{actor.character}</div>
                </div>
              </li>
            )
          })} */}
        </ul>
      </div>
    </>
  )
}

export default connect()(MovieInfos)
