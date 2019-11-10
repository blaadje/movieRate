import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

interface Iprops extends React.AllHTMLAttributes<any> {
  children: React.ReactElement
}

const Wrapper = styled.div`
  width: ${rem('55px')};
  height: ${rem('55px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => rgba(theme.colors.black, 0.3)};
  cursor: pointer;
  transition: ${({ theme }) => theme.delay} all ease;

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.black, 0.2)};
  }
`

const ButtonOption: React.FunctionComponent<Iprops> = ({
  children,
}: Iprops) => {
  return <Wrapper>{children}</Wrapper>
}

export default ButtonOption
