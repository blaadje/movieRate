import * as React from 'react'
import styled from 'styled-components'

import Divider from '@components/Divider'

interface Iprops {}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.XL} 0;
`

const PaddedWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.XL};
`

const Filters: React.FunctionComponent<Iprops> = () => {
  return (
    <Wrapper>
      <PaddedWrapper>
        <h3>Filters</h3>
      </PaddedWrapper>
      <Divider />
      <PaddedWrapper>
        <span>Type</span>
      </PaddedWrapper>
    </Wrapper>
  )
}

export default Filters
