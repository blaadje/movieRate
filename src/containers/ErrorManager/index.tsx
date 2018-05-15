import * as React from 'react'

import { connect } from 'react-redux'
import { flow } from 'lodash'

import Svg from 'react-inlinesvg'

import * as close from 'images/close.svg'

import './style.scss'

interface iProps {
  error: any,
  onClick: () => void
}

interface iState {
  error: any
}

class ErrorManager extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      error: null
    }
  }

  componentWillReceiveProps ({ error }: any) {
    this.setState(error)
  }

  render () {
    const { error } = this.state

    if (!error) {
      return null
    }

    return (
      <div className='ErrorManager-wrapper'>
        <div className='ErrorManager-message'>
          {error.message}
        </div>
        <div
          className='ErrorManager-close'
          onClick={() => this.setState({ error: null })}
        >
          <Svg src={close}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    error: state.application
  }
}

export default flow(
  connect(mapStateToProps)
)(ErrorManager)
