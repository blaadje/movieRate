import * as React from 'react'

import './style.scss'
import Icon from 'components/Icon'

interface Iprops extends React.HTMLAttributes<any> {
  value: any
  onReset: () => void
}

const Input: React.SFC<Iprops> = (props: Iprops) => {
  return (
    <div className='Input-wrapper'>
      <input
        value={props.value}
        className={`${props.className} Input`}
        placeholder='Search movie'
        onChange={(event) => props.onChange && props.onChange(event)}

      />
      {props.value &&
        <div onClick={() => props.onReset()}>
          <Icon className='Input-image' glyph='close'/>
        </div>
      }
    </div>
  )
}

export default Input
