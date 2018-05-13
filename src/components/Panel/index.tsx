import * as React from 'react'
import './style.scss'

interface iProps {
  targetComponent: React.ReactNode,
  panelComponent: React.ReactNode,
}

interface iState {
  isOpen: boolean
}

export default class Panel extends React.Component<iProps, iState> {
  constructor (props: iProps, state: iState) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  render () {
    const { targetComponent, panelComponent } = this.props
    const { isOpen } = this.state

    return (
      <div>
        <div onClick={() => this.setState({ isOpen: !isOpen })}>
          {targetComponent}
        </div>
        {isOpen &&
          <div className='Panel-wrapper'>
            <div className='Panel-container'>
              {panelComponent}
            </div>
          </div>
        }
      </div>
    )
  }
}
