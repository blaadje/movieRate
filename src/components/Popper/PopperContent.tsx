import * as React from 'react'

import onClickOutside from 'react-onclickoutside'

interface Iprops {
  content: React.ReactNode
  onClickOutside: (event: any) => void
}

class PopperContent extends React.Component<Iprops, {}> {
  handleClickOutside = (event: any) => {
    this.props.onClickOutside && this.props.onClickOutside(event)
  }

  render() {
    return <>{this.props.content}</>
  }
}

export default onClickOutside(PopperContent as any) as any
