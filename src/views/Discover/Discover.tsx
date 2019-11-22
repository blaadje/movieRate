import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Popper from '@components/Popper'
import Rate from '@components/Rate'
import FilterButton from '@containers/FilterButton'
import MovieItem from '@containers/MovieItem'
import Search from '@containers/Search'
import { resourceFetch, resourceFetchMore } from '@core/store/actions'
import {
  DISCOVER,
  DISCOVER_FILTER_ID,
  FilterProps,
  MOVIES_FILTER,
  TVS_FILTER,
} from '@core/store/constants'
import { activeFilter, discoverByType } from '@core/store/selectors'

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
  resourceFetchMore: any
  setRateFilter: any
}

const Discover: React.FunctionComponent<Iprops> = ({
  movies,
  resourceFilter,
  resourceFetch,
  resourceFetchMore,
}: Iprops) => {
  const [rate, setRate] = React.useState(0)

  const querylist: any = [
    {
      filter: ({ vote_average }: any) => vote_average >= rate,
      query: {
        ['vote_count.gte']: rate * 2,
      },
    },
  ]

  const filteredMovies = movies
    .filter((movie: any) => querylist.some((query: any) => query.filter(movie)))
    .sort((a: any, b: any) => b.vote_average - a.vote_average)

  const handleChange = (rate: number) => {
    setRate(rate)
  }

  const queries = querylist.reduce(
    (acc: any, { query }: any) => ({
      ...acc,
      ...query,
    }),
    {}
  )

  const loadMore = () =>
    resourceFetchMore({
      resourceType: DISCOVER,
      relationShip: resourceFilter.value,
      options: {
        queries,
      },
    })

  React.useEffect(
    () =>
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: resourceFilter.value,
        options: {
          queries,
        },
      }),
    [resourceFilter, rate]
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
        {filteredMovies &&
          filteredMovies.map((movie: any) => (
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
    resourceFetchMore: (params: any) => {
      dispatch(resourceFetchMore(params))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {
    movies: discoverByType(state),
    resourceFilter: activeFilter(state, DISCOVER_FILTER_ID).value,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover)
