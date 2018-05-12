import * as React from 'react'

import onClickOutside from 'react-onclickoutside'

interface iProps {
  content: React.ReactNode,
  onClickOutside: (event: any) => void
}

interface iState {
}

class PopperContent extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
  }

  handleClickOutside = (event: any) => {
    this.props.onClickOutside && this.props.onClickOutside(event)
  }

  render () {
    return (
      <>{this.props.content}</>
    )
  }
}

export default onClickOutside(PopperContent)
