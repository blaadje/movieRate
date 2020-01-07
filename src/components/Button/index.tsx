import rem from 'polished/lib/helpers/rem'
import React from 'react'
import styled, { css } from 'styled-components'

interface Iprops {
  raw?: string
  primary?: string
  children: React.ReactNode
}

const Wrapper: any = styled.button`
  height: 50px;
  font-size: ${rem('18px')};
  color: ${({ theme }) => theme.colors.white};
  width: ${rem('250px')};
  outline: none;
  background: transparent;
  border: 1px solid white;
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;

  ${({ raw }: Iprops) =>
    raw &&
    css`
      border: none;
      border-radius: 0;
      width: auto;
    `}
`

const Button: React.FunctionComponent<Iprops> = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>
}

export default Button
