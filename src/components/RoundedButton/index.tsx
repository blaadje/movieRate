import rgba from 'polished/lib/color/rgba'
import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

interface Iprops extends React.AllHTMLAttributes<any> {
  active?: boolean
  children: React.ReactElement
  className?: string
}

const Wrapper: any = styled.div`
  width: ${rem('40px')};
  height: ${rem('40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => rgba(theme.colors.black, 0.3)};
  cursor: pointer;
  transition: background ${({ theme }) => theme.delay} ease;
  border: ${({ active, theme }: any) =>
    active ? `2px solid ${rgba(theme.colors.white, 0.4)}` : 'none'};

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.white, 0.1)};
  }
`

const ButtonOption: React.FunctionComponent<Iprops> = ({
  children,
  active = false,
  className,
  ...rest
}: Iprops) => {
  return (
    <Wrapper className={className} {...rest} active={active}>
      {children}
    </Wrapper>
  )
}

export default ButtonOption
