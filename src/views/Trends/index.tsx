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
  DISCOVER_MOVIES,
  DISCOVER_TVS,
} from '@core/store/constants'
import { activeFilter, discoverMovies } from '@core/store/selectors'

const Wrapper = styled.div`
  padding-bottom: 2em;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.XXL};
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
  activeFilter: filterProps
  movies: any
}

const Trends: React.FunctionComponent<Iprops> = ({
  dispatch,
  activeFilter,
  movies,
}: Iprops) => {
  const fetch = () =>
    dispatch(
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: activeFilter.field,
      })
    )

  React.useEffect((): any => {
    fetch()
  }, [activeFilter])

  return (
    <Wrapper>
      <Header>
        <Search />
        <CategorySelector
          popperPlacement="bottom"
          targetComponent={
            <>
              {activeFilter.label}
              <Icon className="icon" glyph="vector" />
            </>
          }
          popperComponent={
            <>
              <StyledFilterButton raw={true} filter={DISCOVER_MOVIES}>
                {DISCOVER_MOVIES.label}
              </StyledFilterButton>
              <StyledFilterButton raw={true} filter={DISCOVER_TVS}>
                {DISCOVER_TVS.label}
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
    </Wrapper>
  )
}

const mapStateToProps = (state: any) => {
  return {
    movies: discoverMovies(state),
    activeFilter: activeFilter(state, 0).value,
  }
}

export default connect(mapStateToProps)(Trends)
