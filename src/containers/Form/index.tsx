import * as React from 'react'

import Rate from 'components/Rate'
import Button from 'components/Button'
import Textarea from 'components/Textarea'

import './style.scss'

interface iProps {
  movieId: number
}

interface iState {
  movieId: number,
  rate: number,
  description: string
}

export default class Form extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      movieId: this.props.movieId,
      rate: 4,
      description: ''
    }
  }

  submitForm (event: any) {
    event.preventDefault()
  }

  handleDescription (event: any) {
    this.setState({ description: event.target.value })
  }

  render () {
    const { rate, description } = this.state

    return (
      <form className='Form-wrapper' onSubmit={(event) => this.submitForm(event)}>
        <Rate
          wrapperClass='u-mgv--m'
          readonly={false}
          rate={rate}
          onChange={(rate: any) => this.setState({ rate })}
        />
        <hr/>
        <div>
          <h2 className='Form-title'>Description</h2>
          <Textarea
            className='Form-textarea'
            value={description}
            onChange={(value) => this.handleDescription(value)}
            placeholder='Put what you think about the movie here...'
          />

          <Button type='submit'/>
        </div>
      </form>
    )
  }
}
