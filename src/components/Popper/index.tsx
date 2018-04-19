import * as React from 'react'

import * as PopperJS from 'popper.js'

import onClickOutside from 'react-onclickoutside'

import {
  Manager,
  Reference,
  Popper
} from 'react-popper'

import uuid from 'core/uuid'

import './style.scss'

interface iProps {
  style?: any,
  hidePopper?: boolean,
  popperComponent: React.ReactNode,
  targetComponent: React.ReactNode,
  popperModifiers?: Object,
  onClickOutside?: () => void,
  onOpen?: () => void,
  popperPlacement?: PopperJS.Placement,
  className?: string
}

interface iState {
  hideBasePopper: boolean,
  popperLinkId: string
}

class BasePopper extends React.Component<iProps, iState> {
  constructor (props: iProps) {
    super(props)
    this.state = {
      hideBasePopper: true,
      popperLinkId: `jsPopperTarget-${uuid()}`
    }
  }

  handleClickOutside = (event) => {
    this.onClickOutsideWrapper && this.onClickOutsideWrapper(event)
  }

  componentDidUpdate () {
    const { onOpen, hidePopper } = this.props

    if (onOpen && !hidePopper) {
      onOpen()
    }
  }

  onClickOutsideWrapper (event) {
    const path = event.path || (event.composedPath && event.composedPath()) || []

    for (let i = 0; i < path.length - 1; i++) {
      if (path[i].id === this.state.popperLinkId) {
        return
      }
    }

    this.handleClickOutside ? this.handleClickOutside(event) : this.setState({ hideBasePopper: true })
  }

  setListeners (manager) {
    for (let prop in manager) {
      if (prop.startsWith('on') && ['onmousemove', 'onmouseover', 'ontouchmove', 'onmouseenter', 'onmouseout', 'onmouseleave', 'onpointerenter', 'onpointerout', 'onpointerleave', 'onpointermove', 'onpointerover', 'onwheel'].indexOf(prop) === -1) {
        manager.addEventListener(prop.substring(2), e => {
          try {
            if ((e.target && typeof e.target.hasAttribute === 'function') &&
              (
                (e.target.hasAttribute('close-popper') && e.target.getAttribute('close-popper') === e.type) ||
                (e.target.closest('[close-popper]') && e.target.closest('[close-popper]').getAttribute('close-popper') === e.type)
              )
            ) {
              setTimeout(() => this.setState({ hideBasePopper: true }), 0)
            }
          } catch (e) {
            return e
          }
        })
      }
    }
  }

  render () {
    const {
      hidePopper,
      popperComponent,
      popperPlacement,
      targetComponent
    } = this.props

    const { hideBasePopper } = this.state
    const hasHidePopper = typeof hidePopper !== 'undefined'
    const shouldBeHidden = (!hasHidePopper && hideBasePopper) || (hasHidePopper && hidePopper)

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div
              id={this.state.popperLinkId}
              onClick={() => !hasHidePopper ? this.setState({ hideBasePopper: !hideBasePopper }) : null}
            >
              {<div ref={ref}>{targetComponent}</div>}
            </div>
          )}
        </Reference>
        <div ref={container => this.setListeners(container)}>
          {!shouldBeHidden &&
            <Popper placement={popperPlacement}>
              {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} className='Popper' style={style} data-placement={popperPlacement}>
                  {popperComponent}
                  <div
                    className='Arrow'
                    ref={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                </div>
              )}
            </Popper>
          }
        </div>
      </Manager>
    )
  }
}

export default onClickOutside(BasePopper)
