import { isEmpty } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Icon from '@components/Icon'
import { useDidUpdateEffect } from '@core/utils'

interface Iprops {
  error?: any
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.S};
  z-index: 10;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.red};

  &:before {
    content: '';
    flex: 0.1;
  }
`

const Message = styled.span`
  flex: 2;
`

const StyledIcon = styled(Icon)`
  cursor: pointer;
  width: 15px;
  height: 15px;
  flex-grow: 0.1;
`

const ErrorManager: React.FunctionComponent<Iprops> = ({ error }: Iprops) => {
  const [isOpen, setIsOpen] = React.useState(false)

  useDidUpdateEffect((): any => {
    setIsOpen(true)
  }, [error])

  if (!isOpen || isEmpty(error)) {
    return null
  }

  return (
    <Wrapper>
      <Message>{error.message}</Message>
      <StyledIcon onClick={() => setIsOpen(false)} size="xl" glyph="close" />
    </Wrapper>
  )
}

const mapStateToProps = (state: any) => {
  return {
    error: state.error,
  }
}

export default connect(mapStateToProps)(ErrorManager)
