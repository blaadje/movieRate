import { rgba } from 'polished'
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
  white: string
  black: string
  dark: string
  highlight: string
  grey: string
  greyLight: string
  blue: string
  red: string
}

const colors: ColorsProps = {
  white: '#FFFFFF',
  black: '#000000',
  dark: '#1e2e3d',
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
  boxShadow: (color: string = colors.black): string =>
    `0px 0px 30px ${rgba(color, 0.3)}`,
  colors,
  radius: rem('3px'),
  delay,
  transition: `all ${delay} ease`,
  spacing,
  fontFamily: 'Catamaran',
}
