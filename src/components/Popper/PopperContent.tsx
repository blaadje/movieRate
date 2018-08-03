import * as React from 'react'

import onClickOutside from 'react-onclickoutside'

interface iProps {
  content: React.ReactNode,
  onClickOutside: (event: any) => void
}

class PopperContent extends React.Component<iProps, {}> {
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
