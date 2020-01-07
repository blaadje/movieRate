import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import React from 'react'
import ReactDOM from 'react-dom'
import onClickOutside from 'react-onclickoutside'
import styled, { css } from 'styled-components'

import { isPopperOpenned, uuid } from '@core/utils'

interface Iprops {
  targetComponent: React.ReactNode
  panelComponent: React.ReactNode
  direction?: 'left' | 'right'
  width?: string
  onClickOutside?: () => void
  onClick?: () => void
}

const clickOutsideConfig = {
  handleClickOutside: (component: any) => component.props.onClickOutside,
}

const Container = onClickOutside(function Container({
  children,
  className,
}: any) {
  return <div className={className}>{children}</div>
},
clickOutsideConfig)

const StyledContainer: any = styled(Container)`
  box-shadow: ${({ theme }) => theme.boxShadow()};
  width: ${({ width }) => width};
  top: 0;
  bottom: 0;
  height: 100%;
  background: ${({ theme }) => rgba(theme.colors.dark, 0.98)};
  position: absolute;

  ${({ direction }: Iprops) =>
    direction === 'left'
      ? css`
          left: ${rem('350px')};
        `
      : css`
          right: 0;
        `}
`

const Panel: React.FunctionComponent<Iprops> = ({
  targetComponent,
  panelComponent,
  onClickOutside,
  onClick,
  direction = 'left',
  width = '55%',
}: Iprops) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [panelLinkId] = React.useState(`jsPanelTarget-${uuid()}`)
  const element: any = React.useRef(document.createElement('div'))
  const handeClickOutside = (event: any) => {
    if (isPopperOpenned(event, panelLinkId)) {
      return
    }

    onClickOutside && onClickOutside()
    setIsOpen(false)
  }

  const handleClick = () => {
    onClick && onClick()
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    const panel = document.getElementById('panel')

    panel?.appendChild(element.current)
    return () => {
      panel?.removeChild(element.current)
    }
  }, [])

  return (
    <>
      <div id={panelLinkId} onClick={handleClick}>
        {targetComponent}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <StyledContainer
            direction={direction}
            width={width}
            onClickOutside={handeClickOutside}
          >
            {panelComponent}
          </StyledContainer>,
          element.current
        )}
    </>
  )
}

export default Panel
