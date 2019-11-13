import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'

interface Iprops extends NavLinkProps {
  children: React.ReactElement
  className?: string
  attrs?: any
  icon: React.ReactElement
  activeClassName: string
}

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.M};
`

const Link: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { children, icon } = props

  return (
    <NavLink {...props}>
      {Icon && <Icon>{icon}</Icon>}
      {children}
    </NavLink>
  )
}

export default styled(Link).attrs({
  activeClassName: 'active',
})`
  font-size: 20px;
  display: flex;
  align-items: center;
  transition-property: background, color, fill;
  transition-duration: ${({ theme }) => theme.delay};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.greyLight};
  :hover {
    color: ${({ theme }) => theme.colors.highlight};
    cursor: pointer;
  }

  &.${props => props.activeClassName} {
    color: ${({ theme }) => theme.colors.highlight};
  }
`
