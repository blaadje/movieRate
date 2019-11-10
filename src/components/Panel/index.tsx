import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'

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

const StyledContainer = styled(Container)`
  box-shadow: ${({ theme }) => theme.boxShadow()};
  width: 55%;
  height: 100%;
  background: ${({ theme }) => theme.colors.dark};
`

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: ${rem('295px')};
  opacity: 0.99;
  z-index: 1;
  cursor: initial;
`

interface Iprops {
  targetComponent: React.ReactNode
  panelComponent: React.ReactNode
  onClickOutside?: () => void
}

const Panel: React.FunctionComponent<Iprops> = ({
  targetComponent,
  panelComponent,
  onClickOutside,
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
          <StyledContainer onClickOutside={handeClickOutside}>
            {panelComponent}
          </StyledContainer>
        </Wrapper>
      )}
    </>
  )
}

export default Panel
