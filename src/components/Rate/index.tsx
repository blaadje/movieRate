import * as React from 'react'

import Svg from 'react-inlinesvg'
import Rating from 'react-rating'

import * as star from 'images/star.svg'
import * as starUnchecked from 'images/starUnchecked.svg'

import './style.scss'

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
        emptySymbol={<Svg className='Rate-icon' src={starUnchecked} />}
        fullSymbol={<Svg className='Rate-icon' src={star} />}
        initialRating={rate}
        onChange={(rate) => props.onChange}
      />
    </div>
  )
}

Rate.defaultProps = {
  readonly: true
}

export default Rate
