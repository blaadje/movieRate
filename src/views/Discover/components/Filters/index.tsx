import * as React from 'react'
import styled from 'styled-components'

import Divider from '@components/Divider'
import Input from '@components/Input'
import Rate from '@components/Rate'
import { MOVIES_FILTER, TVS_FILTER } from '@core/store/constants'

interface Iprops {
  genres: any[]
  currentType: string
  currentRate: number
  onSelectedType: (type: object) => void
  onSelectedRate: (rate: number) => void
  onSelectedGenre: (id: number) => void
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.XL} 0;
`

const PaddedWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.XL};
`

const Filters: React.FunctionComponent<Iprops> = ({
  genres,
  currentRate,
  onSelectedRate,
  currentType,
  onSelectedType,
  onSelectedGenre,
}: Iprops) => {
  return (
    <Wrapper>
      <PaddedWrapper>
        <h3>Filters</h3>
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <div>Type</div>
        <Input
          value={MOVIES_FILTER.value}
          label={MOVIES_FILTER.label}
          name="typeFilter"
          id="moviesFilter"
          type="radio"
          checked={currentType === 'movie'}
          onChange={() => onSelectedType(MOVIES_FILTER)}
        />
        <Input
          value={TVS_FILTER.value}
          label={TVS_FILTER.label}
          name="typeFilter"
          id="tvsFilter"
          type="radio"
          checked={currentType === 'tv'}
          onChange={() => onSelectedType(TVS_FILTER)}
        />
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <div>Genre</div>
        {genres &&
          genres.map((genre: any) => {
            return (
              <Input
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
        <div>Rate</div>
        <Rate
          rate={currentRate}
          readonly={false}
          onClick={(rate: number) => onSelectedRate(rate)}
        />
      </PaddedWrapper>
    </Wrapper>
  )
}

export default Filters
