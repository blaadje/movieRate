import * as React from 'react'

interface iProps extends React.HTMLAttributes<any> {
  wrapperclass?: string,
  className?: string,
  filter?: boolean,
  filterClass?: string,
  src: string,
  children?: React.ReactNode,
}

const Image: React.SFC<iProps> = (props: iProps) => {
  const { src, children, className, filter, filterClass, ...htmlProps } = props
  return (
    <div {...htmlProps} className={`Image-wrapper ${className || ''}`} style={{ background: `url(${props.src})` }}>
      <div className={`${filter ? 'isShowed' : ''} ${filterClass || ''} Image-filter`}>
        {props.children}
      </div>
    </div>
  )
}

export default Image
