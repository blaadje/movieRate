import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Input from '@components/Input'
import { useDebounce, useDidUpdateEffect } from '@core/utils'

interface Iprops {
  placeholder: string
  onSearch: (value: string) => any
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

const StyledInput = styled(Input)`
  flex-grow: 2;
`
const StyledCross = styled(Icon)`
  cursor: pointer;
`

const Search: React.FunctionComponent<Iprops> = ({
  placeholder = 'Search...',
  onSearch,
}: Iprops) => {
  const [value, setValue] = React.useState('')
  const debouncedOnSearch = useDebounce(onSearch, 300)

  useDidUpdateEffect(() => {
    debouncedOnSearch(value)
  }, [value])

  return (
    <Wrapper>
      <Icon size="xl" glyph="search" />
      <StyledInput
        type="text"
        id="search"
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => setValue(target.value)}
      />
      {value && (
        <StyledCross size="xl" glyph="close" onClick={() => setValue('')} />
      )}
    </Wrapper>
  )
}

export default connect()(Search)
