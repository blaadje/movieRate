import * as React from 'react'

import { connect } from 'react-redux'

import Svg from 'react-inlinesvg'

import './style.scss'

interface Iprops {
  error: any
}

interface Istate {
  error: any
}

class ErrorManager extends React.Component<Iprops, Istate> {
  constructor(props: Iprops, state: Istate) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidUpdate({ error }: any) {
    this.setState(error)
  }

  render() {
    const { error } = this.state

    if (!error) {
      return null
    }

    return (
      <div className="ErrorManager-wrapper">
        <div className="ErrorManager-message">{error.message}</div>
        <div
          className="ErrorManager-close"
          onClick={() => this.setState({ error: null })}
        >
          <Svg src={close} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    error: state.application,
  }
}

export default connect(mapStateToProps)(ErrorManager)
