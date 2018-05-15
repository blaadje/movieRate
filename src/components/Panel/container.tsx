import * as React from 'react'

import onClickOutside, { HandleClickOutside } from 'react-onclickoutside'

import './style.scss'

interface iProps {
  content: React.ReactNode,
  onClickOutside: () => any
}

class PanelContainer extends React.Component<iProps, {}> {
  handleClickOutside = (event: HandleClickOutside<any>) => {
    this.props.onClickOutside()
  }

  render () {
    const { content } = this.props
    return (
      <div className='Panel-container'>
        {content}
      </div>
    )
  }
}
export default onClickOutside(PanelContainer)
