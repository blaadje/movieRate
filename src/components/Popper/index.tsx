import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import ReactDOM from 'react-dom'
import onClickOutside from 'react-onclickoutside'
import { Manager, Popper, Reference } from 'react-popper'
import styled, { css } from 'styled-components'

import { uuid } from '@core/utils'

interface Iprops extends React.HTMLAttributes<any> {
  popperComponent: React.ReactNode
  targetComponent: React.ReactNode
  onClickOutside?: () => void
  onClick?: () => void
  popperPlacement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const StyledWrapper = styled.div`
  ${({ theme }) => css`
    box-shadow: ${theme.boxShadow()};
    padding: ${theme.spacing.L};
    color: ${theme.colors.white};
    background: ${rgba(theme.colors.dark, 0.95)};
    border-radius: ${theme.radius};
    margin: ${theme.spacing.L};
    cursor: initial;
  `}
`

const ArrowArea = styled.div`
  position: absolute;
  display: flex;
  &[data-placement='bottom'] {
    width: 100%;
    bottom: 100%;
    height: ${rem('30px')};
    left: 0;
    justify-content: center;
  }
  &[data-placement='top'] {
    top: 100%;
    width: 100%;
    height: ${rem('30px')};
    left: 0;
    justify-content: center;
  }
  &[data-placement='right'] {
    right: 100%;
    top: 0;
    height: 100%;
    width: ${rem('30px')};
    align-items: center;
  }
  &[data-placement='left'] {
    left: 100%;
    top: 0;
    height: 100%;
    width: ${rem('30px')};
    align-items: center;
  }
`

const size = rem('8px')
const Arrow = styled.div`
  width: ${rem('10px')};
  height: ${rem('10px')};
  border: 1px solid red;
  border-style: solid;

  &[data-placement='bottom'] {
    margin-top: auto;
    border-width: 0 ${size} ${size} ${size};
    border-color: transparent transparent ${({ theme }) => theme.colors.dark}
      transparent;
  }

  &[data-placement='top'] {
    border-width: ${size} ${size} 0 ${size};
    border-color: ${({ theme }) => theme.colors.dark} transparent transparent
      transparent;
  }

  &[data-placement='right'] {
    margin-left: auto;
    border-width: ${size} ${size} ${size} 0;
    border-color: transparent ${({ theme }) => theme.colors.dark} transparent
      transparent;
  }

  &[data-placement='left'] {
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
  onClick,
  ...rest
}: Iprops) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [popperLinkId] = React.useState(`jsPopperTarget-${uuid()}`)
  const element: any = React.useRef(document.createElement('div'))

  const toggle = () => {
    onClick && onClick()
    setIsOpen(!isOpen)
  }
  const handeClickOutside = (event: any) => {
    const path =
      event.path || (event.composedPath && event.composedPath()) || []

    for (let i = 0; i < path.length - 1; i++) {
      if (path[i].id === popperLinkId) {
        return
      }
    }

    onClickOutside && onClickOutside()
    setIsOpen(false)
  }

  React.useEffect(() => {
    const popper = document.getElementById('popper')

    popper?.appendChild(element.current)
    return () => {
      popper?.removeChild(element.current)
    }
  }, [])

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            {...rest}
            id={popperLinkId}
            className={className}
            onClick={toggle}
          >
            {<div ref={ref}>{targetComponent}</div>}
          </div>
        )}
      </Reference>
      {isOpen &&
        ReactDOM.createPortal(
          <Popper placement={popperPlacement}>
            {({ ref, style, placement, arrowProps }) => (
              <StyledWrapper ref={ref} style={style} data-placement={placement}>
                <PopperContent onClickOutside={handeClickOutside}>
                  {popperComponent}
                </PopperContent>
                <ArrowArea data-placement={placement}>
                  <Arrow
                    ref={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                </ArrowArea>
              </StyledWrapper>
            )}
          </Popper>,
          element.current
        )}
    </Manager>
  )
}

export default BasePopper
