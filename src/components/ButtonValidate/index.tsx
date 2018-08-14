import * as React from 'react'

import Svg from 'react-inlinesvg'

import * as checked from 'images/checked.svg'

import './style.scss'

const Button: React.SFC<React.AllHTMLAttributes<any>> = (props: React.AllHTMLAttributes<any>) => {
  return (
    <div className='ButtonValidate-wrapper'>
      <input
        className='Button'
        value=''
        {...props}
      />
      <Svg className='Button-image' src={checked}/>
    </div>
  )
}

export default Button
