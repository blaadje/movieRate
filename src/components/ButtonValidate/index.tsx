import * as React from 'react'

import './style.scss'
import Icon from 'components/Icon'

const Button: React.SFC<React.AllHTMLAttributes<any>> = (props: React.AllHTMLAttributes<any>) => {
  return (
    <div className='ButtonValidate-wrapper'>
      <input
        className='Button'
        value=''
        {...props}
      />
      <Icon className='Button-image' glyph='checked' />
    </div>
  )
}

export default Button
