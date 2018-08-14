import * as React from 'react'

import Svg from 'react-inlinesvg'

import './style.scss'

export type OptionTypes = 'infos' | 'rate' | 'playlist'

interface Iprops extends React.AllHTMLAttributes<any> {
  type: OptionTypes
}

const getSrc = (value: Iprops['type']) => {
  switch (value) {
    case 'infos':
      return 'information'
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
      <Svg className='Option-image' src={require(`images/${getSrc(type)}.svg`)} />
    </div>
  )
}

export default ButtonOption
