import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import Svg from 'react-inlinesvg'
import styled from 'styled-components'

import iconsMap from '@components/Icon/iconsMap'
import { getSize, sizeOptions } from '@core/utils'

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

export default styled(Icon)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  fill: ${({ theme }) => theme.colors.greyLight};
  height: ${({ size }) => rem(getSize(size))};
  width: ${({ size }) => rem(getSize(size))};
`
