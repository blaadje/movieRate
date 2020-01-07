import rem from 'polished/lib/helpers/rem'
import React from 'react'
import styled from 'styled-components'

import Icon from '@components/Icon'
import Link from '@components/Link'
import Rate from '@components/Rate'

const Wrapper = styled.aside`
  position: relative;
  display: inline-block;
  vertical-align: top;
  z-index: 200;
  background: ${({ theme }) => theme.colors.dark};
  height: 100vh;
  flex-shrink: 0;
  flex-basis: ${rem('350px')};
`

const Nav = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  padding: ${({ theme }: any) => theme.spacing.XXL} 0;
`

const Logo = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${({ theme }) => theme.spacing.M} * 5) 0;
  font-size: ${rem('25px')};
`

const Title = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.M};
`

const NavLink = styled(Link)`
  padding: ${({ theme }: any) => `${theme.spacing.L} ${theme.spacing.XXL}`};
  &:hover {
    background: ${({ theme }) => theme.colors.grey};
    .icon {
      fill: ${({ theme }) => theme.colors.highlight};
    }
  }

  &.active {
    border-right: 4px solid ${({ theme }) => theme.colors.highlight};
    border-radius: 2px;

    .icon {
      fill: ${({ theme }) => theme.colors.highlight};
    }
  }
`

const SideBar: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Logo>
        <Title>Movie Rate</Title>
        <Rate readonly={true} rate={4} />
      </Logo>
      <Nav>
        <NavLink
          exact={true}
          to="/"
          icon={<Icon className="icon" glyph="clock" />}
        >
          <span>Trending</span>
        </NavLink>
        <NavLink to="/discover" icon={<Icon className="icon" glyph="seen" />}>
          <span>Discover</span>
        </NavLink>
        <NavLink to="/seen" icon={<Icon className="icon" glyph="seen" />}>
          <span>Movie seen</span>
        </NavLink>
        <NavLink
          to="/playlist"
          icon={<Icon className="icon" glyph="playlist" />}
        >
          <span>Playlist</span>
        </NavLink>
      </Nav>
    </Wrapper>
  )
}

export default SideBar
