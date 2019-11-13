import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Popper from '@components/Popper'
import FilterButton from '@containers/FilterButton'
import MovieItem from '@containers/MovieItem'
import Search from '@containers/Search'
import { resourceFetch } from '@core/store/actions'
import {
  filterProps,
  DISCOVER,
  DISCOVER_FILTER_ID,
  MOVIE,
  MOVIES_FILTER,
  TVS_FILTER,
} from '@core/store/constants'
import { activeFilter, discoverMovies } from '@core/store/selectors'

const Header = styled.header`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.L};
`

const CategorySelector = styled(Popper)`
  font-weight: 600;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.greyLight};
  margin-left: ${({ theme }) => theme.spacing.XL};
  cursor: pointer;

  .icon {
    margin-left: ${({ theme }) => theme.spacing.S};
  }
`

const MovieWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledFilterButton: any = styled(FilterButton)`
  display: block;
  width: 100%;
  text-align: left;
`

interface Iprops {
  activeFilter: filterProps
  movies: any
  resourceFetch: any
}

const Discover: React.FunctionComponent<Iprops> = ({
  activeFilter,
  movies,
  resourceFetch,
}: Iprops) => {
  const [movieCurrentPage, incrementMoviePage] = React.useState(1)
  const [tvCurrentPage, incrementTvPage] = React.useState(1)
  const isMovieFilter = activeFilter.field === MOVIE

  const loadMore = () =>
    isMovieFilter
      ? incrementMoviePage(movieCurrentPage + 1)
      : incrementTvPage(tvCurrentPage + 1)

  React.useEffect(
    (): any =>
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: activeFilter.field,
        options: {
          queries: {
            page: isMovieFilter ? movieCurrentPage : tvCurrentPage,
          },
        },
      }),
    [activeFilter, movieCurrentPage, tvCurrentPage]
  )

  return (
    <>
      <Header>
        <Search />
        <CategorySelector
          targetComponent={
            <>
              {activeFilter.label}
              <Icon className="icon" glyph="vector" />
            </>
          }
          popperComponent={
            <>
              <StyledFilterButton
                raw={true}
                filterId={DISCOVER_FILTER_ID}
                filterBy={MOVIES_FILTER}
              >
                {MOVIES_FILTER.label}
              </StyledFilterButton>
              <StyledFilterButton
                raw={true}
                filterId={DISCOVER_FILTER_ID}
                filterBy={TVS_FILTER}
              >
                {TVS_FILTER.label}
              </StyledFilterButton>
            </>
          }
        />
      </Header>
      <MovieWrapper>
        {movies &&
          movies.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
      </MovieWrapper>
      <button onClick={loadMore}>load more</button>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    resourceFetch: (params: any) => {
      dispatch(resourceFetch(params))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: discoverMovies(state),
    activeFilter: activeFilter(state, 0).value,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover)
