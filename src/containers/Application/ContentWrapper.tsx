import * as React from 'react'

interface Iprops {
  children?: React.ReactNode
}

export const ContentWrapper: React.SFC<Iprops> = (props: Iprops) => {
  return (
    <div className='ContentGradientWrapper'>
      <div className='ContentWrapper'>
        {props.children}
      </div>
    </div>
  )
}
