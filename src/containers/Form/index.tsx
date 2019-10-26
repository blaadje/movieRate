import * as React from 'react'

import { connect } from 'react-redux'

import ButtonValidate from 'components/ButtonValidate'
import Rate from 'components/Rate'
import Textarea from 'components/Textarea'

import './style.scss'

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
      <form className="Form-wrapper" onSubmit={event => this.submitForm(event)}>
        <Rate
          wrapperClass="u-mgv--m"
          readonly={false}
          rate={rate}
          onChange={(rate: any) => this.setState({ rate })}
        />
        <hr />
        <div>
          <h2 className="Form-title">Description</h2>
          <Textarea
            className="Form-textarea"
            value={description}
            onChange={value => this.handleDescription(value)}
            placeholder="Put what you think about the movie here..."
          />

          <ButtonValidate type="submit" />
        </div>
      </form>
    )
  }
}

export default connect()(Form)
