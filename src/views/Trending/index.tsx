import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Popper from '@components/Popper'
import FilterButton from '@containers/FilterButton'
import MovieItem from '@containers/MovieItem'
import { resourceFetch } from '@core/store/actions'
import {
  FilterProps,
  MOVIES_FILTER,
  TRENDING,
  TRENDING_FILTER_ID,
  TVS_FILTER,
} from '@core/store/constants'
import { activeFilter, trendingByType } from '@core/store/selectors'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.L};
  font-size: 20px;
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
  dispatch: (Object: any) => Promise<any>
  resourceFilter: FilterProps
  movies: any
}

const Trending: React.FunctionComponent<Iprops> = ({
  dispatch,
  resourceFilter,
  movies,
}: Iprops) => {
  const fetch = () =>
    dispatch(
      resourceFetch({
        resourceType: TRENDING,
        relationShip: resourceFilter.value,
        options: {
          parameter: 'week',
        },
      })
    )

  React.useEffect((): any => {
    // tslint:disable-next-line: no-floating-promises
    fetch()
  }, [resourceFilter])

  return (
    <>
      <Header>
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
                filterId={TRENDING_FILTER_ID}
                filterBy={MOVIES_FILTER}
              >
                {MOVIES_FILTER.label}
              </StyledFilterButton>
              <StyledFilterButton
                raw={true}
                filterId={TRENDING_FILTER_ID}
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
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    movies: trendingByType(state),
    resourceFilter: activeFilter(state, TRENDING_FILTER_ID).value,
  }
}

export default connect(mapStateToProps)(Trending)
