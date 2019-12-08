import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

import { getSize, sizeOptions } from '@core/utils'

interface Iprops {
  size?: sizeOptions
}

const Wrapper: any = styled.hr`
  border: none;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  margin: ${({ size }: any) => rem(getSize(size))} 0;
`

const Divider: React.FunctionComponent<Iprops> = ({ size }) => {
  return <Wrapper size={size} />
}

export default Divider
