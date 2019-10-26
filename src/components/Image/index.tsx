import * as React from 'react'
import ImageLoader from 'react-load-image'

import Image from 'components/Image/image'
import Loader from 'components/Loader'

import './style.scss'

interface Iprops extends React.HTMLAttributes<any> {
  wrapperclass?: string
  loader?: boolean
  className?: string
  filter?: boolean
  filterClass?: string
  src: string
  children?: React.ReactNode
}

const ImageWrapper: React.SFC<Iprops> = (props: Iprops) => {
  const {
    src,
    wrapperclass,
    className,
    loader,
    filter,
    filterClass,
    children,
  } = props

  return (
    <ImageLoader src={src} className={wrapperclass}>
      <Image
        {...{
          className,
          wrapperclass,
          filter,
          filterClass,
          src,
          children,
        }}
      />
      <div className={className}>Error</div>
      <div className={`u-pos--r ${className}`}>{loader && <Loader />}</div>
    </ImageLoader>
  )
}

ImageWrapper.defaultProps = {
  loader: true,
  filter: false,
}

export default ImageWrapper
