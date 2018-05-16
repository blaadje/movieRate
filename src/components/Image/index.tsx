import * as React from 'react'

import ImageLoader from 'react-load-image'
import Loader from 'components/Loader'

import './style.scss'

interface iProps extends React.HTMLAttributes<any> {
  wrapperclass?: string,
  className?: string,
  filter?: boolean,
  filterClass?: string,
  src: string,
  children?: React.ReactNode,
}

const ImageWrapper: React.SFC<iProps> = (props: iProps) => {
  const { src, wrapperclass, className } = props
  return (
    <ImageLoader
      src={src}
      className={`ImageLoader-wrapper ${wrapperclass || ''}`}
    >
      <Image {...props} />
      <div>error</div>
      <div className={`u-pos--r ${className}`}>
        <Loader />
      </div>
    </ImageLoader>
  )
}

ImageWrapper.defaultProps = {
  filter: false
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

export default ImageWrapper
