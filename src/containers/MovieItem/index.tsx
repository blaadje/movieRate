import * as React from 'react'

import './style/style.scss'
import RowItem from './modes/Row';
import ColumnItem from './modes/Column';

interface iProps {
  isRow?: boolean,
  movie: any
}

interface iState {
  isHovered: Boolean
}

export default class MovieItem extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
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

    return <RowItem
      onHovered={(value: boolean) => this.setState({ isHovered: value })}
      isHovered={isHovered}
      movie={movie}
    />
  }
}
