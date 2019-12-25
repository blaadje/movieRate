import * as React from 'react'
import { spring, Motion } from 'react-motion'
import styled from 'styled-components'

interface Iprops {
  raw?: string
  primary?: string
  enable: boolean
  children: React.ReactNode
  onToggleFade?: () => void
}

const Wrapper: any = styled.div`
  position: relative;
  cursor: ${({ isOpen }: any) => (isOpen ? 'pointer' : 'none')};
`

const Content: any = styled.div.attrs(({ opacity }: any) => ({
  style: { opacity },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.2s ease;
`

const Fadeout: React.FunctionComponent<Iprops> = ({
  children,
  enable = true,
  onToggleFade,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const timer: any = React.useRef()

  const handleFade = () => {
    onToggleFade && onToggleFade()
    setIsOpen(false)
  }

  const showDetailsWithTimer = () => {
    clearInterval(timer.current)
    if (!isOpen) {
      onToggleFade && onToggleFade()
      setIsOpen(true)
    }

    if (!enable) {
      return
    }
    timer.current = setTimeout(handleFade, 3000)
  }

  React.useEffect(() => {
    showDetailsWithTimer()
    return () => clearInterval(timer.current)
  }, [enable])

  return (
    <Wrapper {...rest} isOpen={isOpen} onMouseMove={showDetailsWithTimer}>
      {isOpen && (
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
          {({ opacity }) => <Content opacity={opacity}>{children}</Content>}
        </Motion>
      )}
    </Wrapper>
  )
}

export default Fadeout
