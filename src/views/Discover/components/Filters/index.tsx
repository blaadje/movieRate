import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

import Divider from '@components/Divider'
import Input from '@components/Input'
import Rate from '@components/Rate'
import Select from '@components/Select'
import {
  DEFAULT,
  MOVIE,
  MOVIES_FILTER,
  TV,
  TVS_FILTER,
} from '@core/store/constants'

interface Iprops {
  genres: any[]
  currentType: string
  currentYear: null | number
  currentRate: number
  onSelectedType: (type: object) => void
  onSelectedRate: (rate: number) => void
  onSelectedGenre: (id: number) => void
  onSelectedYear: (value: number | string) => void
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.XL} 0;
  overflow: auto;
  height: 100%;
`

const PaddedWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.XL};
`

const StyledSelect = styled(Select)`
  width: 100%;
`

const StyledInput = styled(Input)`
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const Label = styled.div`
  font-size: ${rem('18px')};
  margin-bottom: ${({ theme }) => theme.spacing.XS};
`

const generateYears = [...Array(30)].map((_, index) => {
  const date = new Date().getFullYear() - index

  return { value: date }
})

const Filters: React.FunctionComponent<Iprops> = ({
  genres,
  currentRate,
  onSelectedRate,
  currentType,
  currentYear,
  onSelectedType,
  onSelectedGenre,
  onSelectedYear,
}: Iprops) => {
  return (
    <Wrapper>
      <PaddedWrapper>
        <h3>Filters</h3>
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <Label>Type</Label>
        <Input
          value={MOVIES_FILTER.value}
          label={MOVIE}
          name="typeFilter"
          id="moviesFilter"
          type="radio"
          checked={currentType === 'movie'}
          onChange={() => onSelectedType(MOVIES_FILTER)}
        />
        <Input
          value={TVS_FILTER.value}
          label={TV}
          name="typeFilter"
          id="tvsFilter"
          type="radio"
          checked={currentType === 'tv'}
          onChange={() => onSelectedType(TVS_FILTER)}
        />
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <Label>Genre</Label>
        {genres &&
          genres.map((genre: any) => {
            return (
              <StyledInput
                key={genre.id}
                value={genre.id}
                name={genre.name}
                label={genre.name}
                id={`genre-${genre.id}`}
                type="checkbox"
                checked={genre.isChecked}
                onChange={() => onSelectedGenre(genre.id)}
              />
            )
          })}
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <Label>Rate</Label>
        <Rate
          rate={currentRate}
          readonly={false}
          onClick={(rate: number) => onSelectedRate(rate)}
        />
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <Label>Release Year</Label>
        <StyledSelect
          value={currentYear || DEFAULT}
          options={[{ value: DEFAULT, label: 'all years' }, ...generateYears]}
          onChange={({ target }) => onSelectedYear(Number(target.value))}
        />
      </PaddedWrapper>
    </Wrapper>
  )
}

export default Filters
