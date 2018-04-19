import * as React from 'react'

import Svg from 'react-inlinesvg'

import * as search from 'images/search.svg'

import './style.scss'

export default class Search extends React.Component {
  render () {
    return (
      <div className='Search-wrapper'>
        <Svg src={search}></Svg>
        <input className='Input' placeholder='Search movie'/>
      </div>
    )
  }
}
