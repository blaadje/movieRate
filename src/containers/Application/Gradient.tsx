import * as React from 'react'

import Image from 'components/Image'

import * as gradient1 from 'images/Rectangle.svg'
import * as gradient2 from 'images/Rectangle2.png'

interface iProps {
  children?: React.ReactNode
}

export const Gradient: React.SFC<iProps> = (props: iProps) => {
  return (
    <Image wrapperclass='Gradient' src={gradient1}>
      <Image className='MainWrapper' src={gradient2}>
        {props.children}
      </Image>
    </Image>
  )
}
