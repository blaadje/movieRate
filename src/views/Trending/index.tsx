import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Popper from '@components/Popper'
import FilterButton from '@containers/FilterButton'
import MovieBlock from '@containers/MovieBlock'
import { resourceFetchAction } from '@core/store/actions'
import {
  MOVIES_FILTER,
  TRENDING,
  TRENDING_FILTER_ID,
  TVS_FILTER,
} from '@core/store/constants'
import { activeFilter, trendingResources } from '@core/store/selectors'

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.XXL};
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.L};
  font-size: 20px;
`

const CategorySelector = styled(Popper)`
  /* font-weight: 600; */
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
  resourceFilter: {
    value: string
    label: string
  }
  movies: any
}

const Trending: React.FunctionComponent<Iprops> = ({
  dispatch,
  resourceFilter,
  movies,
}: Iprops) => {
  const fetch = () =>
    dispatch(
      resourceFetchAction({
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
    <Wrapper>
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
            <MovieBlock key={movie.id} movie={movie} />
          ))}
      </MovieWrapper>
    </Wrapper>
  )
}

const mapStateToProps = (state: any) => {
  return {
    movies: trendingResources(state, TRENDING_FILTER_ID),
    resourceFilter: activeFilter(state, TRENDING_FILTER_ID),
  }
}

export default connect(mapStateToProps)(Trending)
