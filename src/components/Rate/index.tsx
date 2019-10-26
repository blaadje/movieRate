import * as React from 'react'

import Rating from 'react-rating'

import './style.scss'
import Icon from 'components/Icon'

interface Iprops {
  wrapperClass?: string
  rate: number
  readonly?: boolean
  onChange?: (rate: number) => void
}

const Rate: React.SFC<Iprops> = (props: Iprops) => {
  const rate = Math.round(props.rate / 2)

  return (
    <div className={`Rate-wrapper ${props.wrapperClass || ''}`}>
      <Rating
        readonly={props.readonly}
        emptySymbol={<Icon className="Rate-icon" glyph="starUnchecked" />}
        fullSymbol={<Icon className="Rate-icon" glyph="star" />}
        initialRating={rate}
        onChange={rate => props.onChange}
      />
    </div>
  )
}

Rate.defaultProps = {
  readonly: true,
}

export default Rate
