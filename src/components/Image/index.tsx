import * as React from 'react'

import './style.scss'

interface iProps extends React.HTMLAttributes<any> {
  className?: string,
  src: string,
  children?: React.ReactNode,
}

const Image: React.SFC<iProps> = (props: iProps) => {
  const { src, children, className, ...htmlProps } = props

  return (
    <div {...htmlProps} className={`Image-wrapper ${className}`} style={{ background: `url(${props.src})` }}>
      {props.children}
    </div>
  )
}

export default Image
