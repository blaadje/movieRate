import * as React from 'react'

import Svg from 'react-inlinesvg'

import * as close from 'images/close.svg'

import './style.scss'

interface iProps {
  error: any,
  onClick: () => void
}

export default class ErrorManager extends React.Component<iProps> {
  render () {
    const { error, onClick } = this.props
    return (
      <div className='ErrorManager-wrapper'>
        <div className='ErrorManager-message'>
          {error.message}
        </div>
        <div
          className='ErrorManager-close'
          onClick={() => onClick()}
        >
          <Svg src={close}/>
        </div>
      </div>
    )
  }
}
