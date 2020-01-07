import { rem } from 'polished'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Panel from '@components/Panel'
import Rate from '@components/Rate'
import Search from '@components/Search'
import MovieBlock from '@containers/MovieBlock'
import {
  resourceFetchAction,
  resourceFetchMoreAction,
  setFilterAction,
  ResourceFetchParams,
} from '@core/store/actions'
import {
  allowedTypes,
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
import Tag from './components/Tag'

const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.XXL};
  padding-top: 0;
`

const Header = styled.header`
  position: sticky;
  background: ${({ theme }) => theme.colors.gradient};
  opacity: 0.9;
  top: 0;
  z-index: 2;
  padding-top: ${({ theme }) => theme.spacing.XL};
  padding-bottom: ${({ theme }) => theme.spacing.XL};
  padding-left: ${({ theme }) => theme.spacing.XXL};
  padding-right: ${({ theme }) => theme.spacing.XXL};
  margin-bottom: ${({ theme }) => theme.spacing.L};
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TagsWrapper = styled.div`
  display: flex;
`

const MovieWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledTag = styled(Tag)`
  margin-right: ${({ theme }) => theme.spacing.L};
`

const FiltersTrigger = styled.span`
  cursor: pointer;
`

interface Iprops {
  movies: MovieItem[]
  genres: GenreItem[]
  resourceFilter: {
    value: allowedTypes
    label: string
  }
  yearFilter: null | number
  genreFilter: []
  rateFilter: number
  resourceFetch: (
    resourceType: allowedTypes,
    options: ResourceFetchParams
  ) => void
  resourceFetchMore: (
    resourceType: allowedTypes,
    options: ResourceFetchParams
  ) => void
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

  const getDateFieldByResource = () => {
    return resourceFilter.value === MOVIE
      ? 'primary_release_year'
      : 'first_air_date_year'
  }
  const queries: any = {
    ['vote_average.gte']: rateFilter * 2,
    with_genres: genreFilter,
    [getDateFieldByResource()]: yearFilter,
    sort_by: 'release_date.desc',
  }

  React.useEffect(
    () =>
      resourceFetch(DISCOVER, {
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

    resourceFetchMore(isSearching ? SEARCH : DISCOVER, {
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
    resourceFetch(SEARCH, {
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
        <SearchWrapper>
          <Search placeholder="Search a movie" onSearch={handleSearch} />
          <Panel
            direction="right"
            width={rem('300px')}
            targetComponent={<FiltersTrigger>Filters</FiltersTrigger>}
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
        </SearchWrapper>
        {(localGenres.length && (
          <TagsWrapper>
            {localGenres.map((genre: any) => {
              if (!genre.isChecked) {
                return
              }

              return (
                <StyledTag
                  key={genre.name}
                  onRemove={() => handleSelectedGenre(genre.id)}
                >
                  {genre.name}
                </StyledTag>
              )
            })}
            {rateFilter > 1 && (
              <StyledTag
                onRemove={() => setFilter({ value: 1 }, RATE_FILTER_ID)}
              >
                <Rate rate={rateFilter} />
              </StyledTag>
            )}
            {yearFilter && (
              <StyledTag
                onRemove={() => setFilter({ value: null }, YEAR_FILTER_ID)}
              >
                {yearFilter}
              </StyledTag>
            )}
          </TagsWrapper>
        )) ||
          null}
      </Header>
      <ContentWrapper>
        <MovieWrapper>
          {!movies.length && <div>No Movie</div>}
          {movies.map((movie: any) => (
            <MovieBlock
              key={movie.id}
              movie={movie}
              filterId={DISCOVER_FILTER_ID}
              resourceType={resourceFilter.value}
            />
          ))}
        </MovieWrapper>
        <button onClick={loadMore}>load more</button>
      </ContentWrapper>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    resourceFetch: (
      resourceType: allowedTypes,
      options: ResourceFetchParams
    ) => {
      dispatch(resourceFetchAction(resourceType, options))
    },
    resourceFetchMore: (
      resourceType: allowedTypes,
      options: ResourceFetchParams
    ) => {
      dispatch(resourceFetchMoreAction(resourceType, options))
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

export default connect(mapStateToProps, mapDispatchToProps)(Discover)
