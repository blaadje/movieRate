import * as React from 'react'

import Svg from 'react-inlinesvg'

import * as checked from 'images/checked.svg'

import './style.scss'

interface iProps {
  type: string
}

const Button: React.SFC<iProps> = (props: iProps) => {
  return (
    <div className='Button-wrapper'>
      <input 
      className='Button'
      value=''
      onClick={(e) => {e.preventDefault()}}
      {...props} />
      <Svg className='Button-image' src={checked}/>
    </div>
  )
}

export default Button
