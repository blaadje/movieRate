import * as React from 'react'

import './style.scss'
import Icon from 'components/Icon'

export type OptionTypes = 'infos' | 'rate' | 'playlist'

interface Iprops extends React.AllHTMLAttributes<any> {
  type: OptionTypes
}

const getSrc = (value: Iprops['type']) => {
  switch (value) {
    case 'infos':
      return 'infos'
    case 'rate':
      return 'checked'
    case 'playlist':
      return 'add'
  }
}

const ButtonOption: React.SFC<React.AllHTMLAttributes<any>> = (props: Iprops) => {
  const { type } = props

  return (
    <div className='ButtonOption-wrapper'>
      <Icon className='Option-image' glyph={getSrc(type) as any} />
    </div>
  )
}

export default ButtonOption
