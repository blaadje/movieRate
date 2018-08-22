import * as React from 'react'

import './style.scss'

export type Optiondirection = 'left' | 'right'

interface Iprops extends React.AllHTMLAttributes<any> {
  onClick?: () => void,
  active: boolean,
  direction?: Optiondirection,
  children: React.ReactNode
}

const Button: React.SFC<Iprops> = (props: Iprops) => {
  const { children, active, onClick } = props

  return (
    <div onClick={onClick} className={`Button-wrapper ${active ? 'isActive' : ''}`}>
      {children}
    </div>
  )
}

export default Button
