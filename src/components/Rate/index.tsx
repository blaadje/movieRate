import * as React from 'react'
import Rating from 'react-rating'
import styled from 'styled-components'

import Icon from '@components/Icon'

interface Iprops {
  wrapperClass?: string
  rate: number
  readonly?: boolean
  onChange?: (rate: number) => void
}

const StyledRating = styled(Rating)`
  display: flex;
  align-items: center;

  .icon:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing.XS};
  }
`

const Rate: React.FunctionComponent<Iprops> = ({
  readonly,
  onChange,
  rate,
}: Iprops) => {
  return (
    <StyledRating
      readonly={readonly}
      emptySymbol={<Icon className="icon" glyph="starUnchecked" />}
      fullSymbol={<Icon className="icon" glyph="star" />}
      initialRating={Math.round(rate / 2)}
      onChange={rate => onChange && onChange(rate)}
    />
  )
}

Rate.defaultProps = {
  readonly: true,
}

export default Rate
