import * as React from 'react'

interface iProps {
  children?: React.ReactNode
}

export const ContentWrapper: React.SFC<iProps> = (props: iProps) => {
  return (
    <div className='ContentGradientWrapper'>
      <div className='ContentWrapper'>
        {props.children}
      </div>
    </div>
  )
}
