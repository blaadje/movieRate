import * as React from 'react'

import './style.scss'

interface iProps {
}

const Loader: React.SFC<iProps> = (props: iProps) => {
  return (
    <div className='Loader-wrapper'>
      <div className='Loader'></div>
    </div>
  )
}

export default Loader
