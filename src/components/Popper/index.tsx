import * as React from 'react'

import * as PopperJS from 'popper.js'

import {
  Manager,
  Reference,
  Popper
} from 'react-popper'

import PopperContent from './PopperContent'

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

export default class BasePopper extends React.Component<iProps, iState> {
  constructor (props: iProps) {
    super(props)
    this.state = {
      hideBasePopper: true,
      popperLinkId: `jsPopperTarget-${uuid()}`
    }
  }

  componentDidUpdate () {
    const { onOpen, hidePopper } = this.props

    if (onOpen && !hidePopper) {
      onOpen()
    }
  }

  onClickOutsideWrapper (event: any) {
    const { onClickOutside } = this.props

    const path = event.path || (event.composedPath && event.composedPath()) || []

    for (let i = 0; i < path.length - 1; i++) {
      if (path[i].id === this.state.popperLinkId) {
        return
      }
    }

    onClickOutside ? onClickOutside() : this.setState({ hideBasePopper: true })
  }

  setListeners (manager: any) {
    for (let prop in manager) {
      if (prop.startsWith('on') && ['onmousemove', 'onmouseover', 'ontouchmove', 'onmouseenter', 'onmouseout', 'onmouseleave', 'onpointerenter', 'onpointerout', 'onpointerleave', 'onpointermove', 'onpointerover', 'onwheel'].indexOf(prop) === -1) {
        manager.addEventListener(prop.substring(2), (event:any) => {
          try {
            if ((event.target && typeof event.target.hasAttribute === 'function') &&
              (
                (event.target.hasAttribute('close-popper') && event.target.getAttribute('close-popper') === event.type) ||
                (event.target.closest('[close-popper]') && event.target.closest('[close-popper]').getAttribute('close-popper') === event.type)
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
                  <PopperContent
                    content={popperComponent}
                    onClickOutside={(event: any) => { this.onClickOutsideWrapper(event) }}
                  />
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
