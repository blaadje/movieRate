import * as React from 'react'

import Svg from 'react-inlinesvg'

import * as search from 'images/search.svg'

import './style.scss'

interface iProps {
  inputClassName?: string
}

export default class Search extends React.Component<iProps, {}> {
  render () {
    return (
      <div className='Search-wrapper'>
        <Svg className='Search-icon' src={search}></Svg>
        <input className={`${this.props.inputClassName} Input`} placeholder='Search movie'/>
      </div>
    )
  }
}
