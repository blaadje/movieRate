import * as React from 'react'

import ColumnItem from './modes/Column'
import RowItem from './modes/Row'
import './style/style.scss'

interface Iprops {
  isRow?: boolean
  movie: any
}

interface Istate {
  isHovered: Boolean
}

export default class MovieItem extends React.Component<Iprops, Istate> {
  constructor (props: Iprops, state: Istate) {
    super(props)
    this.state = {
      isHovered: false
    }
  }

  render (): any {
    const { isHovered } = this.state
    const { movie, isRow } = this.props

    //
    if (!isRow) {
      return <ColumnItem movie={movie} />
    }

    return (
      <RowItem
        onHovered={(value: boolean) => this.setState({ isHovered: value })}
        isHovered={isHovered}
        movie={movie}
      />
    )
  }
}
