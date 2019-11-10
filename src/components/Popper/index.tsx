import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import onClickOutside from 'react-onclickoutside'
import { Manager, Popper, Reference } from 'react-popper'
import styled, { css } from 'styled-components'

import { uuid } from '@core/utils'

interface Iprops {
  popperComponent: React.ReactNode
  targetComponent: React.ReactNode
  onClickOutside?: () => void
  popperPlacement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const StyledWrapper = styled.div`
  ${({ theme }) => css`
    box-shadow: ${theme.boxShadow()};
    padding: ${theme.spacing.L};
    z-index: 1;
    color: ${theme.colors.white};
    background: ${theme.colors.dark};
    border-radius: ${theme.radius};
    margin: ${theme.spacing.L};
    cursor: initial;
  `}
`

const size = rem('15px')
const Arrow = styled.div`
  position: absolute;
  width: ${rem('30px')};
  height: ${rem('10px')};
  border-style: solid;

  &[data-placement='bottom'] {
    top: -${rem('10px')};
    border-width: 0 ${size} ${size} ${size};
    border-color: transparent transparent ${({ theme }) => theme.colors.dark}
      transparent;
  }

  &[data-placement='top'] {
    bottom: -${rem('10px')};
    border-width: ${size} ${size} 0 ${size};
    border-color: ${({ theme }) => theme.colors.dark} transparent transparent
      transparent;
  }

  &[data-placement='right'] {
    left: -${rem('10px')};
    border-width: ${size} ${size} ${size} 0;
    border-color: transparent ${({ theme }) => theme.colors.dark} transparent
      transparent;
  }

  &[data-placement='left'] {
    right: -${rem('10px')};
    border-width: ${size} 0 ${size} ${size};
    border-color: transparent transparent transparent
      ${({ theme }) => theme.colors.dark};
  }
`

const clickOutsideConfig = {
  handleClickOutside: (component: any) => component.props.onClickOutside,
}

const PopperContent = onClickOutside(function Container({
  children,
  className,
}: any) {
  return <div className={className}>{children}</div>
},
clickOutsideConfig)

const BasePopper: React.FunctionComponent<Iprops> = ({
  className,
  targetComponent,
  popperComponent,
  popperPlacement,
  onClickOutside,
}: Iprops) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [popperLinkId] = React.useState(`jsPopperTarget-${uuid()}`)

  const toggle = () => setIsOpen(!isOpen)
  const handeClickOutside = (event: any) => {
    const path =
      event.path || (event.composedPath && event.composedPath()) || []

    for (let i = 0; i < path.length - 1; i++) {
      if (path[i].id === popperLinkId) {
        return
      }
    }

    onClickOutside ? onClickOutside() : setIsOpen(false)
  }

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div id={popperLinkId} className={className} onClick={toggle}>
            {<div ref={ref}>{targetComponent}</div>}
          </div>
        )}
      </Reference>
      {isOpen && (
        <Popper placement={popperPlacement}>
          {({ ref, style, placement, arrowProps }) => (
            <StyledWrapper
              ref={ref}
              style={style}
              data-placement={popperPlacement}
            >
              <PopperContent onClickOutside={handeClickOutside}>
                {popperComponent}
              </PopperContent>
              <Arrow
                ref={arrowProps.ref}
                data-placement={placement}
                style={arrowProps.style}
              />
            </StyledWrapper>
          )}
        </Popper>
      )}
    </Manager>
  )
}

export default BasePopper
