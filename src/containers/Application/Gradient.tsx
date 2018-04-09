import * as React from 'react'
import * as gradient1 from 'images/Rectangle.svg'
import * as gradient2 from 'images/Rectangle2.png'

interface iProps {
  children?: React.ReactNode
}

export const Gradient: React.SFC<iProps> = (props: iProps) => {
  const background: Object = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  return (
    <div className='Gradient' style={{ background: `url(${gradient1})`, ...background }}>
      <div className='MainWrapper' style={{ background: `url(${gradient2})`, ...background }}>
        {props.children}
      </div>
    </div>
  )
}
