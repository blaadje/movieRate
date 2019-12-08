import { rem } from 'polished'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Panel from '@components/Panel'
import Search from '@components/Search'
import MovieBlock from '@containers/MovieBlock'
import {
  resourceFetchAction,
  resourceFetchMoreAction,
  setFilterAction,
  ResourceFetchParams,
} from '@core/store/actions'
import {
  DISCOVER,
  DISCOVER_FILTER_ID,
  GENRE_FILTER_ID,
  MOVIE,
  RATE_FILTER_ID,
  SEARCH,
  YEAR_FILTER_ID,
} from '@core/store/constants'
import { GenreItem } from '@core/store/orm/resourcesModels/Genre'
import { MovieItem } from '@core/store/orm/resourcesModels/Movie'
import {
  activeFilter,
  discoverResources,
  movieGenres,
} from '@core/store/selectors'

import Filters from './components/Filters'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.L};
`

const MovieWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface Iprops {
  movies: MovieItem[]
  genres: GenreItem[]
  resourceFilter: {
    value: string
    label: string
  }
  yearFilter: null | number
  genreFilter: []
  rateFilter: number
  resourceFetch: (params: ResourceFetchParams) => void
  resourceFetchMore: (params: ResourceFetchParams) => void
  setFilter: (Object: object, filterId: number) => void
}

const Discover: React.FunctionComponent<Iprops> = ({
  movies,
  genres,
  resourceFilter,
  genreFilter,
  yearFilter,
  rateFilter,
  setFilter,
  resourceFetch,
  resourceFetchMore,
}: Iprops) => {
  const [localGenres, setLocalGenres] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState('')

  const getDate = () => {
    return resourceFilter.value === MOVIE
      ? 'primary_release_year'
      : 'first_air_date_year'
  }
  const queries: any = {
    ['vote_average.gte']: rateFilter * 2,
    with_genres: genreFilter,
    [getDate()]: yearFilter,
    sort_by: 'release_date.desc',
  }

  React.useEffect(
    () =>
      resourceFetch({
        resourceType: DISCOVER,
        relationShip: resourceFilter.value,
        options: {
          queries,
        },
      }),
    [resourceFilter.value, rateFilter, genreFilter, yearFilter]
  )

  React.useEffect(() => {
    const formattedGenres = genres.reduce(
      (acc: any, item) => [
        ...acc,
        {
          ...item,
          isChecked: genreFilter.some((genre: any) => genre === item.id),
        },
      ],
      []
    )
    setLocalGenres(formattedGenres)
  }, [genreFilter])

  const loadMore = () => {
    const isSearching = Boolean(searchQuery)

    resourceFetchMore({
      resourceType: isSearching ? SEARCH : DISCOVER,
      relationShip: resourceFilter.value,
      ...(isSearching && { resourceValues: { query: searchQuery } }),
      options: {
        queries: isSearching ? { query: searchQuery } : queries,
      },
    })
  }

  const handleSelectedRate = (value: number) => {
    setFilter({ value }, RATE_FILTER_ID)
  }

  const handleSelectedType = (selectedType: object) => {
    setFilter(selectedType, DISCOVER_FILTER_ID)
  }

  const handleSelectedYear = (value: string | number) => {
    setFilter({ value }, YEAR_FILTER_ID)
  }

  const handleSelectedGenre = (selectedId: any) => {
    const genresWithoutSelectedId = genreFilter.filter(
      (item: any) => item !== selectedId
    )
    const itemToAdd: any =
      (localGenres.find(
        ({ id, isChecked }) => id === selectedId && !isChecked
      ) as any) || null

    setFilter(
      {
        [resourceFilter.value]: {
          value: itemToAdd
            ? [...genresWithoutSelectedId, itemToAdd.id]
            : genresWithoutSelectedId,
        },
      },
      GENRE_FILTER_ID
    )
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    resourceFetch({
      resourceType: SEARCH,
      relationShip: resourceFilter.value,
      resourceValues: { query: value },
      ignoreCall: !Boolean(value),
      options: {
        queries: { query: value },
      },
    })
  }

  return (
    <>
      <Header>
        <Search placeholder="Search a movie" onSearch={handleSearch} />
        <Panel
          direction="right"
          width={rem('300px')}
          targetComponent={<span>Filters</span>}
          panelComponent={
            <Filters
              currentRate={rateFilter}
              currentType={resourceFilter.value}
              currentYear={yearFilter}
              genres={localGenres}
              onSelectedType={handleSelectedType}
              onSelectedRate={handleSelectedRate}
              onSelectedGenre={handleSelectedGenre}
              onSelectedYear={handleSelectedYear}
            />
          }
        />
      </Header>
      <MovieWrapper>
        {!movies.length && <div>No Movie</div>}
        {movies &&
          movies.map((movie: any) => (
            <MovieBlock key={movie.id} movie={movie} />
          ))}
      </MovieWrapper>
      <button onClick={loadMore}>load more</button>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    resourceFetch: (params: any) => {
      dispatch(resourceFetchAction(params))
    },
    resourceFetchMore: (params: any) => {
      dispatch(resourceFetchMoreAction(params))
    },
    setFilter: (filterBy: object, filterId: number) => {
      dispatch(setFilterAction(filterBy, filterId))
    },
  }
}

const mapStateToProps = (state: any) => {
  const resourceFilter = activeFilter(state, DISCOVER_FILTER_ID)

  return {
    genres: movieGenres(state, DISCOVER_FILTER_ID),
    movies: discoverResources(state, DISCOVER_FILTER_ID),
    resourceFilter,
    rateFilter: activeFilter(state, RATE_FILTER_ID).value,
    yearFilter: activeFilter(state, YEAR_FILTER_ID).value,
    genreFilter: activeFilter(state, GENRE_FILTER_ID)[resourceFilter.value]
      .value,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover)
