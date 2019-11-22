import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import onClickOutside from 'react-onclickoutside'
import styled, { css } from 'styled-components'

interface Iprops {
  targetComponent: React.ReactNode
  panelComponent: React.ReactNode
  direction?: 'left' | 'right'
  width?: string
  onClickOutside?: () => void
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
  background: ${({ theme }) => theme.colors.dark};
  position: absolute;

  ${({ direction }: Iprops) =>
    direction === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  left: ${rem('295px')};
  right: 0;
  opacity: 0.99;
  z-index: 1;
  cursor: initial;
`

const Panel: React.FunctionComponent<Iprops> = ({
  targetComponent,
  panelComponent,
  onClickOutside,
  direction = 'left',
  width = '55%',
}: Iprops) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const handeClickOutside = () => {
    onClickOutside && onClickOutside()
    setIsOpen(false)
  }

  return (
    <>
      <div onClick={toggle}>{targetComponent}</div>
      {isOpen && (
        <Wrapper>
          <StyledContainer
            direction={direction}
            width={width}
            onClickOutside={handeClickOutside}
          >
            {panelComponent}
          </StyledContainer>
        </Wrapper>
      )}
    </>
  )
}

export default Panel
