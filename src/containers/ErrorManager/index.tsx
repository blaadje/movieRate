import * as React from 'react'

import { flow } from 'lodash'
import { connect } from 'react-redux'

import Svg from 'react-inlinesvg'

import './style.scss'

interface Iprops {
  error: any
  onClick: () => void
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

  componentWillReceiveProps({ error }: any) {
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

export default flow(connect(mapStateToProps) as any)(ErrorManager)
