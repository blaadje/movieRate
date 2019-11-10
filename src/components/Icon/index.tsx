import * as React from 'react'
import Svg from 'react-inlinesvg'
import styled from 'styled-components'

import iconsMap from '@components/Icon/iconsMap'

export type glyphOptions =
  | 'checked'
  | 'close'
  | 'star'
  | 'starUnchecked'
  | 'search'
  | 'add'
  | 'infos'
  | 'clock'
  | 'playlist'
  | 'seen'
  | 'stars'
  | 'vector'
export type sizeOptions = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

interface Iprops extends React.HTMLAttributes<any> {
  size?: sizeOptions
  glyph: glyphOptions
  className?: string
  onClick?: () => void
}

const Icon: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { className, glyph, onClick } = props
  const icon = iconsMap[glyph]

  return (
    <Svg
      onClick={onClick}
      cacheRequests={true}
      className={className}
      src={icon}
    />
  )
}

const getSize = (size: sizeOptions = 'm'): string => {
  switch (size) {
    case 'xs':
      return '9px'
    case 's':
      return '13px'
    case 'm':
      return '15px'
    case 'l':
      return '20px'
    case 'xl':
      return '25px'
    case 'xxl':
      return '40px'
  }
}

export default styled(Icon)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  fill: ${({ theme }) => theme.colors.greyLight};
  height: ${({ size }) => getSize(size)};
  width: ${({ size }) => getSize(size)};
`
