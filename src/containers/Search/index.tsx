import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Input from '@components/Input'
import { resourceFetch } from '@core/store/actions'
import { MOVIE, SEARCH } from '@core/store/constants'

interface Iprops {
  dispatch: (Object: any) => Promise<any>
}

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

const StyledInput = styled(Input)`
  flex-grow: 2;
`

const Search: React.FunctionComponent<Iprops> = ({ dispatch }: Iprops) => {
  const [value, setValue] = React.useState('')

  const fetchMovie = async (value: string) => {
    if (!value || value.length < 3) {
      return
    }

    await dispatch(
      resourceFetch({
        resourceType: SEARCH,
        relationShip: MOVIE,
        options: {
          queries: {
            query: value,
          },
        },
      })
    )
  }

  const onChangeInput = async (event: React.ChangeEvent<any>) => {
    setValue(event.target.value)
    await fetchMovie(event.target.value)
  }

  return (
    <>
      <InputWrapper>
        <Icon size="xl" glyph="search" />
        <StyledInput
          value={value}
          placeholder="Search movie"
          onChange={onChangeInput}
        />
        {value && <Icon size="xl" glyph="close" />}
      </InputWrapper>
      {/* <List
        direction="column"
        wrapperClass="Search-result"
        collection={movies}
      /> */}
    </>
  )
}

export default connect()(Search)
