import * as React from 'react'
import Svg from 'react-inlinesvg'

import './style.scss'

import iconsMap from 'components/Icon/iconsMap'

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
}

const Icon: React.SFC<Iprops> = (props: Iprops) => {
  const { size, className, glyph, ...rest } = props
  const svgClass = `Icon ${size ? `Icon--${size}` : ''} ${className}`
  const icon = iconsMap[glyph]

  return <Svg cacheRequests={true} className={svgClass} src={icon} {...rest} />
}

Icon.defaultProps = {
  size: 'm',
}

export default Icon
