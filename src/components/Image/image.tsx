import * as React from 'react'

interface Iprops extends React.HTMLAttributes<any> {
  wrapperclass?: string
  className?: string
  filter?: boolean
  filterClass?: string
  src: string
  children?: React.ReactNode
}

const Image: React.SFC<Iprops> = (props: Iprops) => {
  const { src, children, className, filter, filterClass, ...htmlProps } = props
  return (
    <div
      {...htmlProps}
      className={`Image-wrapper ${className || ''}`}
      style={{ background: `url(${props.src})` }}
    >
      <div
        className={`${filter ? 'isShowed' : ''} ${filterClass ||
          ''} Image-filter`}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Image
