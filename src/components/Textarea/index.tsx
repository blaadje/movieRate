import rem from 'polished/lib/helpers/rem'
import * as React from 'react'
import styled from 'styled-components'

const Wrapper: any = styled.textarea`
  background: transparent;
  border: none;
  line-height: 1.5em;
  font-size: ${rem('15px')};
  outline: none;
  resize: none;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.white};
  transition: all ${({ theme }) => theme.delay} ease;

  &::placeholder {
    font-style: italic;
    color: ${({ theme }) => theme.colors.greyLight};
  }
`

const Textarea: React.FunctionComponent<React.AllHTMLAttributes<any>> = (
  props: React.AllHTMLAttributes<any>
) => {
  const autoGrow = (element: any): void => {
    element.target.style.height = element.target.scrollHeight + 'px'
  }

  return <Wrapper {...props} onKeyUp={autoGrow} />
}

export default Textarea
