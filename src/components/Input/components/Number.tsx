import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

interface Iprops extends React.InputHTMLAttributes<any> {}

const Wrapper = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.L} ${({ theme }) => theme.spacing.L};
  width: ${rem('250px')};
  font-size: ${rem('20px')};
  outline: none;

  &::placeholder {
    font-style: italic;
    color: ${({ theme }) => theme.colors.greyLight};
  }

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  }
`

const Input: React.FunctionComponent<Iprops> = (props: Iprops) => {
  return <Wrapper {...props} />
}

export default Input
