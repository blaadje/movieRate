import * as React from 'react'

import onClickOutside, {
  HandleClickOutside,
  InjectedOnClickOutProps,
} from 'react-onclickoutside'

import './style.scss'

type Props = Iprops & InjectedOnClickOutProps & HandleClickOutside<any>

interface Iprops {
  content: React.ReactNode
  onClickOutside: () => any
}

class PanelContainer extends React.Component<Props, {}> {
  handleClickOutside = (event: HandleClickOutside<any>) => {
    this.props.onClickOutside()
  }

  render() {
    const { content } = this.props
    return <div className="Panel-container">{content}</div>
  }
}
export default onClickOutside(PanelContainer as any) as any
