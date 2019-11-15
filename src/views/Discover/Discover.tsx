import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Popper from '@components/Popper'
import Rate from '@components/Rate'
import FilterButton from '@containers/FilterButton'
import MovieItem from '@containers/MovieItem'
import Search from '@containers/Search'
import { resourceFetch, setFilter } from '@core/store/actions'
import {
  DISCOVER,
  DISCOVER_FILTER_ID,
  FilterProps,
  MOVIE,
  MOVIES_FILTER,
  RATE_FILTER_ID,
  TVS_FILTER,
} from '@core/store/constants'
import { activeFilter, filteredMoviesSelector } from '@core/store/selectors'

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
  movies: any
  resourceFilter: FilterProps
  resourceFetch: any
  setRateFilter: any
}

const Discover: React.FunctionComponent<Iprops> = ({
  movies,
  resourceFilter,
  resourceFetch,
  setRateFilter,
}: Iprops) => {
  const [movieCurrentPage, incrementMoviePage] = React.useState(1)
  const [tvCurrentPage, incrementTvPage] = React.useState(1)
  const [rate, setRate] = React.useState(5)
  const isMovieFilter = resourceFilter.value === MOVIE

  const loadMore = () =>
    isMovieFilter
      ? incrementMoviePage(movieCurrentPage + 1)
      : incrementTvPage(tvCurrentPage + 1)

  const handleChange = (rate: number) => {
    setRate(rate)
    setRateFilter({ value: rate })
  }

  React.useEffect(
    () =>
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: resourceFilter.value,
        options: {
          queries: {
            ['vote_count.lte']: rate * 2,
            page: isMovieFilter ? movieCurrentPage : tvCurrentPage,
          },
        },
      }),
    [resourceFilter, movieCurrentPage, tvCurrentPage, rate]
  )

  return (
    <>
      <Header>
        <Search />
        <CategorySelector
          targetComponent={
            <>
              Rates
              <Icon className="icon" glyph="vector" />
            </>
          }
          popperComponent={
            <Rate rate={rate} readonly={false} onClick={handleChange} />
          }
        />
        <CategorySelector
          targetComponent={
            <>
              {resourceFilter.label}
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
    setRateFilter: (params: any) => {
      dispatch(setFilter(params, RATE_FILTER_ID))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: filteredMoviesSelector(state),
    resourceFilter: activeFilter(state, DISCOVER_FILTER_ID).value,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover)
