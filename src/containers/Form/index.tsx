import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@components/Button'
import Icon from '@components/Icon'
import Rate from '@components/Rate'
import Textarea from '@components/Textarea'

interface Iprops {
  dispatch: (Object: any) => void
  movieId: number
}

interface Istate {
  movieId: number
  rate: number
  description: string
}

class Form extends React.Component<Iprops, Istate> {
  constructor(props: Iprops, state: Istate) {
    super(props)
    this.state = {
      movieId: this.props.movieId,
      rate: 4,
      description: '',
    }
  }

  submitForm(event: any) {
    event.preventDefault()
    // const rate = {
    //   movieId: this.state.movieId,
    //   rate: this.state.rate,
    //   description: this.state.description,
    // }
    // this.props.dispatch(resourceCreate(rate))
  }

  handleDescription(event: any) {
    this.setState({ description: event.target.value })
  }

  render() {
    const { rate, description } = this.state

    return (
      <form onSubmit={event => this.submitForm(event)}>
        <Rate
          readonly={false}
          rate={rate}
          onChange={(rate: any) => this.setState({ rate })}
        />
        <hr />
        <div>
          <h2>Description</h2>
          <Textarea
            value={description}
            onChange={value => this.handleDescription(value)}
            placeholder="Put what you think about the movie here..."
          />

          <Button>
            <Icon glyph="checked" />
          </Button>
        </div>
      </form>
    )
  }
}

export default connect()(Form)
