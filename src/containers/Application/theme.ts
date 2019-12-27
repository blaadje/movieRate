import { darken, lighten, linearGradient, rgba } from 'polished'
import rem from 'polished/lib/helpers/rem'

interface SpacingProps {
  XS: string
  S: string
  M: string
  L: string
  XL: string
  XXL: string
}
interface ColorsProps {
  gradient: any
  white: string
  black: string
  dark: string
  highlight: string
  grey: string
  greyLight: string
  blue: string
  red: string
}

const dark = '#1e2e3d'

const gradient = linearGradient({
  colorStops: [
    `${rgba(darken(0.02, dark), 1)} 5%`,
    `${rgba(darken(0, dark), 1)} 20%`,
    `${rgba(lighten(0.01, dark), 1)} 80%`,
  ],
  toDirection: 'to right',
  fallback: dark,
})

const colors: ColorsProps = {
  gradient,
  white: '#FFFFFF',
  black: '#000000',
  dark,
  highlight: '#00ffff',
  grey: '#344350',
  greyLight: '#a5abb1',
  blue: '#176087',
  red: '#b5465a',
}

const spacingUnit: number = 8
const spacing: SpacingProps = {
  XS: rem(spacingUnit / 2), // 4px - 0.4rem
  S: rem(spacingUnit * 1.5), // 12px - 1.2rem
  M: rem(spacingUnit * 2), // 16px - 1.6rem
  L: rem(spacingUnit * 3), // 24px - 2.4rem
  XL: rem(spacingUnit * 4), // 32px - 3.2rem
  XXL: rem(spacingUnit * 5), // 40px - 4rem
}
const delay: string = '0.3s'

export default {
  boxShadow: (opacity = 0.3, color: string = colors.black): string =>
    `0px 0px 30px ${rgba(color, opacity)}`,
  colors,
  radius: rem('2px'),
  delay,
  transition: `all ${delay} ease`,
  spacing,
  fontFamily: 'Catamaran',
}
