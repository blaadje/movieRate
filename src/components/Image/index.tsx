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

const LoadedImage: any = styled.div.attrs(({ src }: Iprops) => ({
  style: {
    background: `url(${src})`,
  },
}))`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`

const Error: any = styled.div.attrs(({ src }: Iprops) => ({
  style: {
    background: `url(${src})`,
  },
}))`
  height: 100%;
  width: 100%;
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
  const errorUrl = 'https://fakeimg.pl/160x240'

  return (
    <ImageLoader src={src} className={className}>
      <LoadedImage {...rest}>
        <Filter hasFilter={filter}>{children}</Filter>
      </LoadedImage>
      <Filter hasFilter={filter}>
        <Error src={errorUrl} {...rest}>
          {children}
        </Error>
      </Filter>
      <Fullsize>{loader && <Loader />}</Fullsize>
    </ImageLoader>
  )
}

export default Image
