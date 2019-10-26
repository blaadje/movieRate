import * as React from 'react'

import PanelContainer from 'components/Panel/container'

import './style.scss'

interface Iprops {
  targetComponent: React.ReactNode
  panelComponent: React.ReactNode
  onClickOutside?: () => void
}

interface Istate {
  isOpen: boolean
}

export default class Panel extends React.Component<Iprops, Istate> {
  constructor(props: Iprops, state: Istate) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  onClickWrapper(): void {
    this.props.onClickOutside && this.props.onClickOutside()
    this.setState({ isOpen: false })
  }

  render() {
    const { targetComponent, panelComponent } = this.props
    const { isOpen } = this.state

    return (
      <div>
        <div onClick={() => this.setState({ isOpen: !isOpen })}>
          {targetComponent}
        </div>
        {isOpen && (
          <div className="Panel-wrapper">
            <PanelContainer
              onClickOutside={() => this.onClickWrapper()}
              content={panelComponent}
            />
          </div>
        )}
      </div>
    )
  }
}
