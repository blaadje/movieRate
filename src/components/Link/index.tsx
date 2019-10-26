import * as React from 'react'
import { NavLink, NavLinkProps, withRouter } from 'react-router-dom'
import Button from 'components/Button'

interface Iprops extends NavLinkProps {
  children: React.ReactNode
  staticContext?: string
}

const Link: React.SFC<Iprops> = (props: Iprops) => {
  const { children, location, staticContext, ...rest } = props
  const isActive =
    (location && location.pathname) === rest.to ||
    (typeof rest.exact !== 'undefined' && !rest.exact)

  return (
    <Button active={isActive} direction="right">
      <NavLink {...rest}>{children}</NavLink>
    </Button>
  )
}

export default withRouter(Link as any) as any
