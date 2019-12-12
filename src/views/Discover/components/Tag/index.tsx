import * as React from 'react'
import styled from 'styled-components'

import Icon from '@components/Icon'

interface Iprops {
  onRemove: () => any
}

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacing.S} ${({ theme }) => theme.spacing.S};
`

const StyledCross = styled(Icon)`
  margin-left: ${({ theme }) => theme.spacing.S};
  cursor: pointer;
`

const Tag: React.FunctionComponent<Iprops> = ({
  onRemove,
  children,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      {children}
      <StyledCross size="s" glyph="close" onClick={() => onRemove()} />
    </Wrapper>
  )
}

export default Tag
