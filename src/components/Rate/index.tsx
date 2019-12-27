import * as React from 'react'
import Rating from 'react-rating'
import styled from 'styled-components'

import Icon from '@components/Icon'

interface Iprops {
  wrapperClass?: string
  rate: number
  readonly?: boolean
  onChange?: (rate: number) => void
  onClick?: (rate: number) => void
}

const StyledRating = styled(Rating)`
  display: flex !important;
  align-items: center;

  span {
    display: inline-flex !important;
    align-items: center;
    height: 100%;
  }

  .icon:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing.XS};
  }
`

const Rate: React.FunctionComponent<Iprops> = ({
  readonly = true,
  onChange,
  rate,
  ...rest
}: Iprops) => {
  return (
    <StyledRating
      readonly={readonly}
      emptySymbol={<Icon className="icon" glyph="starUnchecked" />}
      fullSymbol={<Icon className="icon" glyph="star" />}
      initialRating={rate}
      {...rest}
    />
  )
}

export default Rate
