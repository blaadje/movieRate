import * as React from 'react'
import Rating from 'react-rating'

import Svg from 'react-inlinesvg'

import * as star from 'images/star.svg'
import * as starUnckeced from 'images/starUnchecked.svg'

import Button from 'components/Button'
import Textarea from 'components/Textarea'

import './style.scss'

interface iProps {}

interface iState {
  rate: number,
  description: string
}

export default class Form extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      rate: 2,
      description: ''
    }
  }
  render () {
    const { rate } = this.state

    return (
      <form className='Form-wrapper'>
        <Rating
          emptySymbol={<Svg className='Form-rate' src={starUnckeced} />}
          fullSymbol={<Svg className='Form-rate' src={star} />}
          initialRating={rate}
          onChange={rate => this.setState({ rate })}
        />
        <hr/>
        <div>
          <h2 className='Form-title'>Description</h2>
          <Textarea className='Form-textarea' placeholder='Put what you think about the movie here...'/>
          <Button type='submit'/>
        </div>
      </form>
    )
  }
}
