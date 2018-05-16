import * as React from 'react'
import ImageLoader from 'react-load-image'

import Image from './image'
import Loader from 'components/Loader'

import './style.scss'

interface iProps extends React.HTMLAttributes<any> {
  wrapperclass?: string,
  loader?: boolean,
  className?: string,
  filter?: boolean,
  filterClass?: string,
  src: string,
  children?: React.ReactNode,
}

const ImageWrapper: React.SFC<iProps> = (props: iProps) => {
  const { src, wrapperclass, className, loader } = props
  return (
    <ImageLoader
      src={src}
      className={wrapperclass}
    >
      <Image {...props} />
      <div>error</div>
      <div className={`u-pos--r ${className}`}>
        {loader &&
          <Loader />
        }
      </div>
    </ImageLoader>
  )
}

ImageWrapper.defaultProps = {
  loader: true,
  filter: false
}

export default ImageWrapper
