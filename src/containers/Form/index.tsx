import * as React from 'react'

import Rate from 'components/Rate'
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
      rate: 4,
      description: ''
    }
  }
  render () {
    const { rate } = this.state

    return (
      <form className='Form-wrapper'>
        <Rate
          wrapperClass='u-mgv--m'
          readonly={false}
          rate={rate}
          onChange={(rate: any) => this.setState({ rate })}
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
