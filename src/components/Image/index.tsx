import * as React from 'react'

import './style.scss'

interface iProps extends React.HTMLAttributes<any> {
  className?: string,
  filter?: boolean,
  filterClass?: string,
  src: string,
  children?: React.ReactNode,
}

const Image: React.SFC<iProps> = (props: iProps) => {
  const { src, children, className, filter, filterClass, ...htmlProps } = props

  return (
    <div {...htmlProps} className={`Image-wrapper ${className}`} style={{ background: `url(${props.src})` }}>
      <div className={`${filter ? 'isShowed' : ''} ${filterClass || ''} Image-filter`}>
        {props.children}
      </div>
    </div>
  )
}

Image.defaultProps = {
  filter: false
}

export default Image
