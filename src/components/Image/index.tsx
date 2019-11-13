import rgba from 'polished/lib/color/rgba'
import * as React from 'react'
import ImageLoader from 'react-load-image'
import styled from 'styled-components'

import Loader from '@components/Loader'

interface Iprops extends React.HTMLAttributes<any> {
  loader?: boolean
  className?: string
  filter?: any
  src: string
  children?: React.ReactNode
}

const LoadedImage: any = styled.div`
  height: 100%;
  width: 100%;
  background: url(${({ src }: any) => src});
  background-repeat: no-repeat;
  background-size: cover;
`

const Filter: any = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme, hasFilter }: any) =>
    hasFilter ? rgba(theme.colors.blue, 0.2) : ''};
`

const Fullsize = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
`

const Image: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const {
    src,
    className,
    loader = true,
    filter = false,
    children,
    ...rest
  } = props

  return (
    <ImageLoader src={src} className={className}>
      <LoadedImage {...rest}>
        <Filter hasFilter={filter}>{children}</Filter>
      </LoadedImage>
      <Fullsize>Error</Fullsize>
      <Fullsize>{loader && <Loader />}</Fullsize>
    </ImageLoader>
  )
}

export default Image
